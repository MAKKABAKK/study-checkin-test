const endpoint = 'https://shike-dictation-journal.comelyshell2.chatgpt.site/api/checkin';

async function request(path, body) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(endpoint + path, {
      method:body ? 'POST' : 'GET',
      ...(body && {headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),
      credentials:'omit',cache:'no-store',redirect:'error',signal:controller.signal,
    });
    if (response.status === 204) return null;
    if (response.ok) return await response.json();
    if (response.status === 409) throw Error('云端进度已更新，请重新选择备份。');
    if (response.status === 404) throw Error('云端还没有这份计划或任务。');
    if (response.status === 400 || response.status === 413) throw Error('云端未接受这份打卡数据，请核对后重试。');
    throw Error('云端服务暂时不可用，请稍后重试。');
  } catch (error) {
    if (error instanceof TypeError || error.name === 'AbortError') throw Error('暂时无法连接云端，请检查网络后重试。');
    throw error;
  } finally { clearTimeout(timeout); }
}

export const publicPlan = {
  getSnapshot(since) { return request(since === undefined ? '' : '?since='+since); },
  setCheckin(key,value) { return request('/check',{key,value}); },
  importBackup(plan,checked,expectedRevision) { return request('/restore',{plan,checked,expectedRevision}); },
};
