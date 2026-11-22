// The build embeds public file paths, byte lengths and SHA-256 integrity values.
const materials = [["index.html",22182,"sha256-yfJKyh4qo8VGUdb35izCexXkmW7buHXCkPquJMgRIQA="],["dictation.html",3057,"sha256-qBvccuY61JZihsSY6pnIxWYKYqSyr+CEDNhJ3RtKIf0="],["app.js",57310,"sha256-09l/hkRW21TZvnLxm0LmCYG8pWWP62fLJhSQVfytaIc="],["material-cache.js",3417,"sha256-h6pBxea80mplmLs3joHSPEs4G0dYDleFQlq7YZkbu18="],["reading.css",4001,"sha256-lSXjKc4PbSLB8lM7f+xIUWFDLO75QQq49Flkdk2rcjg="],["course-access.js",622,"sha256-3hHP0Ar10hYMq5tQs4ESulTJehr+ER0c45M2BfF7gLg="],["dictation-loader.js",7634,"sha256-FC+axIhTy8a5Vbb6qc6nIqsGZg09+HX40rmm8GVzb/k="],["dictation-adapter.js",17853,"sha256-uO08jPqgKqI0yAhxlnKOpwym/myfItjjyTcrqduMNcE="],["dictation-engine.js",14346,"sha256-ZL2Q7CelF24/FtjPE0U2mvVpTRkI5bke+3ZJvtFhsP4="],["dictation-sync.js",5699,"sha256-4aNd08Tq2UJSJbUtxB+2I1+/rKgPpIeY479nTS2buwA="],["dictation-seed.js",4200,"sha256-8eCLSFwCkaDx77nHDD0mQ0eXKt0nE1kweZ9UzzO1Zno="],["style.css",17805,"sha256-JIBYoTdmJYCt4l1pO1Zme8wi8IwM933/JUBFfwI0FYo="],["homework-3.html",11813,"sha256-279QnWHiPbcBDod96+xWnZ8qaEnClHccA5k63SLo4Qk="],["handouts.html",5608,"sha256-uy027RLZnczyA9jc6q3EfZUDooxJQqIKvWsxCQ0klFU="],["handouts.css",4986,"sha256-7VlHdpSAQLGxtTK4fp5sB+jvHAumU0U8q3ojGyZHprA="],["handouts.js",11360,"sha256-PU/KlTFuO7QjDjAaiPXAlZB3cVilME6/FI/F8tCRT68="],["shike.webmanifest",435,"sha256-wzt+CLyY3PU96YiAuNSvEodp5kP5DCAvonx+YEPQ+FU="],["shike-v1.svg",849,"sha256-bQ3rzdbBg5HAgDDAWE/POumc177P2Xra70qlLrDjAa0="],["shike-v1-180.png",17513,"sha256-O2NnWzbJC0vebDyTH/mCc6gt1zVr9G6Eo87GIXw9ys0="],["shike-v1-192.png",14209,"sha256-syDncw8CZaqpe52wkks4sUqqN1iNsbYH9shcVcB7LfE="],["shike-v1-512.png",63893,"sha256-L4BGiuE5pUaNwweIhJKZv2EYn9ee0hdrN59E2pKFdS0="],["focus-timer.js",12667,"sha256-2ocW6eSV0Kp7iPcWwwO9Bj6xZgXUKaXi1/0gd2aQCl4="],["focus-timer.css",2583,"sha256-HOw9uu7NNGKNovIhRmg45HnJ1T2KfUkSRzdtRuJMVbo="],["public-plan.js",1515,"sha256-JRFMzpR1kNrUQK6DcmbVIRulky4W6Km6ZZiQOm3uEhI="],["study-navigation.js",1528,"sha256-ucNrETb6yOgrNf79+c2rg5/ON7ljf2ZXMRD8UAAjPgg="],["journal-scope.js",263,"sha256-DO3i0RHTjtmiZEAWzCKEms4PLmSuTMspHm8DOMChGeE="],["mixed-review.html",4511,"sha256-cXnzWsqEXAAIUs7nPWjEtdeX58Kpu4MdJiti6rIn7mY="],["mixed-review.js",10014,"sha256-D2IZ8N/oV3JNCMbFwCXFBcgjA2BRIYaKfvi6EJIOV/U="],["mixed-review-data.js",4013,"sha256-VkoebN1qhAyKMmyH8DKwO6pJ+w8+CDomIet4VtjKtAU="],["mixed-review.css",1819,"sha256-kbLqkljfn+HFDEfOEez/wrP18kYYkK2q59/FGQp4Pqw="],["vocabulary.html",4502,"sha256-O6IZEDAZ8pNpbVvWzoOpGB+YeqiehPqOKNve6/SNH8k="],["vocabulary.js",7970,"sha256-Fomyvp3/55Mk43D/6M8JR8Y+pjvvrr65VJv0iYyzNA8="],["vocabulary.css",3131,"sha256-VVBKZUIuLLJr3MloOyhLpyeqgMRQ+IJ1J4yYq87muD8="],["word-audio.js",1254,"sha256-hdiQFj0soZSzyYGVVbObzUG9nvrpGQBTXEtLLKNIVU4="],["translation.html",4920,"sha256-OKz9qvDX/fvYQKIrwwXEI0hlvELSvwEG4ySdk8tnjYo="],["translation.js",7850,"sha256-MgB4cf50T+nmm15E5DtFuZyo04mvZr8Soxc5V14LWHo="],["translation.css",3008,"sha256-GhWtICkSaAt6shH+hNhPpfI+okjnny1TZStKfWBzkb4="],["translation-content.js",29840,"sha256-YcWgp2r3ZBwegHIi76hoCSEke+3PXMsiNL/3BHBpRSg="],["translation-progress.js",8266,"sha256-cP6Otj4c1rOXa8wjy8Q59egE30IYQZbtjLfQs95RuVU="],["dictation-data/six/original.bin",15334837,"sha256-9FgU5VH8j3CEc6uKM9n5ovSOf2lOJqAOqnoYjeNIHq0="],["dictation-data/six/player.bin",4451772,"sha256-MKkgv4FF2Wup3Qaz4q5cb0RpNvzbGI20OTW11rXHyV4="],["dictation-data/six/review.json",23783,"sha256-SVUjWv2yf/s1NiZDRU1PBc0iW1/Z9uU9r58m48eMUEI="],["dictation-data/five/original.bin",15333272,"sha256-VnVUQZpl6+0VojjCj6OhgDvSuBn7BH+8s/Qi9Zp1KCs="],["dictation-data/five/player.bin",4424481,"sha256-Nek4CVGRea4ptotQ7qqjMYhtvLoALn7cy9/+27jei00="],["dictation-data/five/review.json",21028,"sha256-07RzPj2MP10ye7BCtW4tTV5C64TyvBAR1Z6Hdp6oCxM="],["dictation-data/four/original.bin",15260969,"sha256-yYyikBmgAX/eqvpeIzx5QA5WMN0YId9fMlk+JKw/RmI="],["dictation-data/four/player.bin",4515560,"sha256-+q3U4k6bGw1aKGjJByReLdrkgQwAEjGFWHcQbnjnyr4="],["dictation-data/four/review.json",19091,"sha256-+tSXwd38V9Ail+GEMxYa+yhrXqUvWeMh6ukIVdBQAhs="],["dictation-data/three/original.bin",15299781,"sha256-hfSHEyuZdbI4kuraheDvONNl7CoG76eo3shlrY/Bo9A="],["dictation-data/three/player.bin",4446947,"sha256-4ZE9FRPiUzli3tC3bVvIQAC4PQQ2dQlk1DZypSKhJoI="],["dictation-data/three/review.json",18892,"sha256-Ej5Z20ul0gQufBRvm+Jr7GK9UTI6PP49RUnIGE+f9O4="],["dictation-data/two/original.bin",15189918,"sha256-MPFLCZwDUtt/SJsun9fDnIKCMCF+TTf1FhninZiwkhQ="],["dictation-data/two/player.bin",4537173,"sha256-YtA8gphRQUnB52IRW+lsJetxfVORwT7j+vxrUvdZz9c="],["dictation-data/two/review.json",19078,"sha256-vu0bO+hEMUcJO+D/ZVPEbwTOLE9shqVNNAeozIY9rVc="],["dictation-data/one/original.bin",16668217,"sha256-Sc2JGcCrPB2JeGoMqCNN3YxawjR/0AE5pXA9e9MN/bo="],["dictation-data/one/player.bin",5044912,"sha256-yMXbHmOhyQDbtC3LekvxRerbRvoAqBcS7EgQTS6h3JI="],["dictation-data/one/review.json",20669,"sha256-VpSo5kqLuWJ02o4rKatfwi1rkbwaUCHltKWTN5MouBM="],["handouts-md/class-notes-17.md",229263,"sha256-0Grebt0L4FvHz+CmWYb0YZpowLq5zQbd+GkWp8QdxSo="],["handouts-md/class-notes-17.html",527731,"sha256-3EeAj4VrEJ2MJZtA1KxNgIWmLXRx4YxLYd31Uqc3mKA="],["handouts-md/speaking-part1-2026-09.md",140589,"sha256-+VmTpoOR8sJTXHIRekYncFGKFkMLQ3o8+txCoIGYPaY="],["handouts-md/speaking-part1-2026-09.html",188748,"sha256-b2wiQFqBKAC3IDLmFBh0zK3jbCUGeIbGSYS54Jrn2tc="],["handouts-data/manifest.json",5544,"sha256-DTYkqyc+tGrhX1veHgRlvjOISRkJYlGL/PyDyz0OUGg="],["handouts-data/class-notes-17/1.bin",147198,"sha256-SyIoTV/TYVFZortGAmPX4uxa+9JQf/MnAb+HyzCdByM="],["handouts-data/class-notes-17/2.bin",137430,"sha256-ZxtE9FeIquIu9cCMPnRok1QReZhWKtYSP8Nd0/PLwEk="],["handouts-data/class-notes-17/3.bin",154764,"sha256-X8gYvz/B+DUCQm0H0+YaoJOe7NNjmRDljhpdx6k0Kos="],["handouts-data/class-notes-17/4.bin",70140,"sha256-eyReqnNX3wQYJAxB0ieN4PGrTfoS3H+Nb+yNUJTGRG0="],["handouts-data/class-notes-17/5.bin",158204,"sha256-+yPMNwxhwSuzRDxJ0HjmynZilsbHwY1UOy5no3alcmI="],["handouts-data/class-notes-17/6.bin",174128,"sha256-0y/GZdGktAy+sNL6iHhMAvJF00P7/5vZp9V4Kr9/dlY="],["handouts-data/class-notes-17/7.bin",183652,"sha256-hCqrAfz1ZftxVOYUEEV1p/1DAkPkdNWNWShSSyD9zvc="],["handouts-data/class-notes-17/8.bin",155466,"sha256-IXyDxwrxY+9iZvdigq4v9AsIj/iM6dle9yeRwMrVM0U="],["handouts-data/class-notes-17/9.bin",132012,"sha256-704ZYJdGBzy+OYRPfTfm7dHvDt4cbH060LvopYEu//Q="],["handouts-data/class-notes-17/10.bin",134212,"sha256-cFEjne55CCEFUO6RChsf90NNTRuYsoivGAaVKYkbE7U="],["handouts-data/class-notes-17/11.bin",145620,"sha256-bp7X5qI7z8JVDeSdhZAKezk2pDJUpITm99SBckzK99Y="],["handouts-data/class-notes-17/12.bin",148906,"sha256-+SEdvwP1xU8C301ObqrxPQWEohn/dwBj7kAILaUGbwA="],["handouts-data/class-notes-17/13.bin",186360,"sha256-+dklumhVDquEtWB1F6yWjogh1RFOKjkIUz9MIG0WhK8="],["handouts-data/class-notes-17/14.bin",171290,"sha256-+fBebv4Q6Qc6NvgrQoeqsrho/QNmvdH5v+ciGabQIfs="],["handouts-data/class-notes-17/15.bin",173766,"sha256-0KUbVqlBNJM+CcEwLpZBo93bQyrlByu0h6FzDeSYXnU="],["handouts-data/class-notes-17/16.bin",186878,"sha256-CKG921shaVQDCg3n2fSraEOGDBzb29ZSLif0JId0KOw="],["handouts-data/class-notes-17/17.bin",157258,"sha256-RXjQnwDWPzw9/gf+oDmoKT1/gR2MFDZmcNLnCWvCdUY="],["handouts-data/class-notes-17/18.bin",124702,"sha256-Ox5vu8GIBLeK84VMWJzzqcaEGkD5wn/lxTjwsDfMcKg="],["handouts-data/class-notes-17/19.bin",148830,"sha256-T+KzB1jwIae+Pv58mqnwD91McDkLA7/Gc6PNWoAo4fs="],["handouts-data/class-notes-17/20.bin",110262,"sha256-YLaWiBrOKsBInpjPjzcSwsHDjXf0P3uUmDIS9MXH+Xw="],["handouts-data/class-notes-17/21.bin",172904,"sha256-zTxb0BiNQC8EvClK4VtfhwRItCuMfZz+xIbXzOg3Cso="],["handouts-data/class-notes-17/22.bin",191696,"sha256-82ANKZQ0JWuRuvgWkecwvyaakSGfuolLlkQpMnnQ5FE="],["handouts-data/class-notes-17/23.bin",160182,"sha256-enXdKOhOYnACorJ8RdwC7C74v24wjiaTwOU2NqQTBkE="],["handouts-data/class-notes-17/24.bin",132406,"sha256-rl1lRaOdhxz38e624DdKIueUoYOT5i3g1ckphfoOl2A="],["handouts-data/class-notes-17/25.bin",125464,"sha256-ehbILhqtV8SIoTYcgWpIg7ykeecY+Ps4xvJu3q6pNwM="],["handouts-data/class-notes-17/26.bin",133046,"sha256-uNreJzxgvSGzZIwAwP+u+ITmEdrYql++YVawttwgXCA="],["handouts-data/class-notes-17/27.bin",158982,"sha256-6K636MG6PVCXM0GO/6FYZnIVJNJcunqYzfosTDgDCPo="],["handouts-data/class-notes-17/28.bin",195014,"sha256-rewFDpkookiR+tb5EQF5gPOFxVqw4KRtJjCfxviRwHY="],["handouts-data/class-notes-17/29.bin",163470,"sha256-Ci6I7iyaM3NN8cY8+AeQ0PbLoVONa0+cdCCs27A9ZTI="],["handouts-data/class-notes-17/30.bin",142866,"sha256-SSCK/WnJ7i+8Dfc+UpFUPRSPF/mZPp4SVm8jSYiNm6Y="],["handouts-data/class-notes-17/31.bin",140864,"sha256-7ZqhN7vaGyAE3oGo7iUDyWeY29VLRQCtKjuSNdfkFr0="],["handouts-data/class-notes-17/32.bin",145552,"sha256-2WBVfL0gWm5P9qRfMRKMmtDfQxl3j3TITj1dd3BxkJQ="],["handouts-data/class-notes-17/33.bin",63030,"sha256-HTf3saU+bXXLQkb4qim1rikYNbiSKVM5XbZIbrszk1g="],["handouts-data/class-notes-17/34.bin",159356,"sha256-lLsilDngw02tySTqXakNJ+QG/0yDKKpmrK8+uFZrMPQ="],["handouts-data/class-notes-17/35.bin",168718,"sha256-XQzXfdgFR9Ia/wQzzaS/RsMedZjkt+Hq3R1uQV9UKpI="],["handouts-data/class-notes-17/36.bin",182044,"sha256-oM4xncdpxbcFhtO/R8hwj11NOV5IqKVp/HCfxR9gCkk="],["handouts-data/class-notes-17/37.bin",157720,"sha256-pXUKQPxUq2R8aD4QAc4VoYx8pKbsYU/YTLL8Tch5Hwk="],["handouts-data/class-notes-17/38.bin",147030,"sha256-ZACd6DU+6WudFI+sz8yKjbo9WL9vMpFFBClx12Sp0I4="],["handouts-data/class-notes-17/39.bin",122960,"sha256-ck1liO2fT7DtJnirDNNaloGYsTYfxwoZv0oq93TVXXU="],["handouts-data/class-notes-17/40.bin",198124,"sha256-4B2YAHBA2kg8clNiiU+0gmim09/hejIoPD14oGpXbgQ="],["handouts-data/class-notes-17/41.bin",153396,"sha256-vSv7GKaMW+0EEj8XAqrGx5kigZKfGErzsT4URy0zIrc="],["handouts-data/class-notes-17/42.bin",200580,"sha256-zveR/AKgzCNivXTAL7cnZe5q0F4CoG81cd+moyra/0I="],["handouts-data/class-notes-17/43.bin",196156,"sha256-XT7diWqIFaYI3wyTrp6P+xfDkl+4SKY+iuzZbGPTR1Q="],["handouts-data/class-notes-17/44.bin",134750,"sha256-/3lPLmdzKEXdcbAx5h6ih/MnoNxhYS9k/NyQ4naLEI8="],["handouts-data/class-notes-17/45.bin",131634,"sha256-8y8Fe00ctK5gsBdb10vSphfVksAX9g8veNaMEop/ftc="],["handouts-data/class-notes-17/46.bin",195078,"sha256-NAE/lA8TOTLsDTc4SHD0ariqJDdBKYXgMjdwXbzwzsY="],["handouts-data/class-notes-17/47.bin",168312,"sha256-Ax3cqcWHws0c7W8Va/4Jb+MAlH+UjMOuxmzq2Hkfz+0="],["handouts-data/class-notes-17/48.bin",178556,"sha256-MMwDo000YR/+9he6h9hysStokjjaWOX+FgHr6j9cC1I="],["handouts-data/class-notes-17/49.bin",191024,"sha256-oxi4dG6bcVlv582mvsy3hdj3W2NZP7zz2QqfHToa5fo="],["handouts-data/class-notes-17/50.bin",178750,"sha256-8SNpacg8Im24NXPbL3nGlUj0DTY4wGNrZgmU0etF4+0="],["handouts-data/class-notes-17/51.bin",175696,"sha256-aujJEe7Bf3YxIigOzf0LaygvNHEMqP6HEj7bibjulLY="],["handouts-data/class-notes-17/52.bin",155896,"sha256-PW0Zmg5FM0JlkKyd/iBjs/BOcnuV8R7HWne6l4YU+sk="],["handouts-data/class-notes-17/53.bin",162742,"sha256-1f+XLkkMgrzdp99qN8zHXjr5KTEuDuEB32p1tmyBO/M="],["handouts-data/class-notes-17/54.bin",144136,"sha256-A4M1mVPRFCIbSppZb4DVY4AdKDtt2M9HLJnwxwge/Rs="],["handouts-data/class-notes-17/55.bin",173104,"sha256-40wiFfwMQR+lfr7KKooz46WDswi3yhKMux1TydQt+XI="],["handouts-data/class-notes-17/56.bin",176524,"sha256-IY7jLqW2XvV781OZSNwvmjgLpoUhMIZ2F1uMTeIExh8="],["handouts-data/class-notes-17/57.bin",166224,"sha256-qOuM04/bwAQOVu8HNViOfXwWH6wW4EAt6yYREI+TQc0="],["handouts-data/class-notes-17/58.bin",165258,"sha256-J6oAxfpOBzL4Iz0dK0gYf62SAkKKARyO5TBgonsSSb4="],["handouts-data/class-notes-17/59.bin",150510,"sha256-8llJyMDP0AU2uybyc3VGyAreT3sxctRQKb/lhnaE2QQ="],["handouts-data/class-notes-17/60.bin",102520,"sha256-qbnkANhXy1h1KJwZTo4Hj2OZD6LoaPQJK3pA8v4/tsw="],["handouts-data/class-notes-17/61.bin",155794,"sha256-kczWW2bEy+EjyOAiJfiHz5Lp31VMdb9tropKMLupa+0="],["handouts-data/class-notes-17/62.bin",153928,"sha256-pF4U7ysyIU4tZ1hkXHxfZCzlhYLmhFiKtiuuJX8V8Lk="],["handouts-data/class-notes-17/63.bin",161018,"sha256-YdCXaQWGw5MhZuGwiEWs2iHh1etQCZpUWGdIfhoR7Ss="],["handouts-data/class-notes-17/64.bin",152272,"sha256-jaIluue/94IJU4BU77cniQOEI4nqAF1TZNSVTEXQAM4="],["handouts-data/class-notes-17/65.bin",188040,"sha256-Vx1HZZxwZ2X4NBwlOXY1tG1OMl5wmhGorqLEZUyRtIM="],["handouts-data/class-notes-17/66.bin",97382,"sha256-u+LLrZLkUbOH4uUnMM4QF1wuEzpaqg4ub1h61ZDCzfo="],["handouts-data/class-notes-17/67.bin",135266,"sha256-vLQFKvEuZN4cO4i78k8gTOlGoPaxWN04/APOF1d0Cz8="],["handouts-data/class-notes-17/68.bin",171588,"sha256-PRA1hBIW3kFjc0Q816ab+TOqmWy147YSmZB7DTLAV6Q="],["handouts-data/class-notes-17/69.bin",135072,"sha256-++ArFQQd7WceMqjebo2wyKfj/sXtEpWnXk91dLA+444="],["handouts-data/class-notes-17/70.bin",136734,"sha256-1SXXAtzJ7b2EM7gsOyqXPNhEmCpgFxClQClZBHwSH7A="],["handouts-data/class-notes-17/71.bin",106064,"sha256-OIxVvmmRcBicKWS2TCbB4U5kAAp2QEWY8dIlLqomCsE="],["handouts-data/class-notes-17/72.bin",141256,"sha256-u8qVifZndbCnredkn3NP42xUZNqIeYpfoqtJ9k26gTI="],["handouts-data/class-notes-17/73.bin",163256,"sha256-nlWhLRsoSD9XA6pHwkCF8fvldZ5sHjw511uquWXa2j0="],["handouts-data/class-notes-17/74.bin",162884,"sha256-mfq0oETta7uYUsYpdOL1r21DvLLsxpt0pnqNY3Iq2d8="],["handouts-data/class-notes-17/75.bin",165298,"sha256-Wj16HyoK5G3fps3FzDRQzFyWxmm8xPDbXDhhgKFFzDw="],["handouts-data/class-notes-17/76.bin",185936,"sha256-ZbUMDwj74Gs/Yd5IB4OrSRLUCS8BmvH+LeqqYuK6H40="],["handouts-data/class-notes-17/77.bin",212012,"sha256-XrG8jNjx+1tuGayTwdy+wySeIPScx8wwYj39j103yFs="],["handouts-data/class-notes-17/78.bin",76916,"sha256-Y7eorktSuCS69hlw8w+ykZjaobu8khSiLqfi4wyqZSI="],["handouts-data/class-notes-17/79.bin",176032,"sha256-IBwB4qfdzx4gGV3BFTJ9SaQrhlB0jfkWL7G0fQLZ2BY="],["handouts-data/class-notes-17/80.bin",219522,"sha256-QbasfZmHachsxHxrhxAHw7vWVaW9E7w9TcklU2XcRBI="],["handouts-data/class-notes-17/81.bin",175194,"sha256-Etf/JiQ7yYamMRtjkYj1denarSlA0ksw/vBHco9rRv4="],["handouts-data/class-notes-17/82.bin",168892,"sha256-gf58TFLzuzPktKoOLhOEq9Y7V8qvjGqRCf+DiTrEe7w="],["handouts-data/class-notes-17/83.bin",178648,"sha256-7TFgYOuX962ZzbfXJQQs/oB/e9xWTRuh4VfCUc4xaJo="],["handouts-data/class-notes-17/84.bin",202714,"sha256-kO7xhWEXplmRij4+nMSHboYd8pqLPyoqNEd/A07cvAA="],["handouts-data/class-notes-17/85.bin",169928,"sha256-EeAaHzcXjFXOw/ta1lJYcwGjaWRN7Ky+FdgGkotvJ/4="],["handouts-data/class-notes-17/86.bin",193742,"sha256-yhDa7pe/PZtU4DSL9BMjB6XAJmwQrNXH8DYETM0juqs="],["handouts-data/class-notes-17/87.bin",142048,"sha256-bwhfAzrYEscOyPpTv2a6TuPSTj5oOGYW1BW0snab8kE="],["handouts-data/class-notes-17/88.bin",219048,"sha256-8oxitxuVzW6fgD1osJx9NCinPORc1TUwZidQXqDiOHE="],["handouts-data/class-notes-17/89.bin",141140,"sha256-eQNXfqz0BOpn9H9jfPWZWc7xa8TxyCAY2O91+ATaFgE="],["handouts-data/class-notes-17/90.bin",130882,"sha256-6AbxBXf3+fNAcAkY2V/C6zKmOwVTn+Vcsf32dkKRQq0="],["handouts-data/class-notes-17/91.bin",174242,"sha256-iXnkz4VMH37yGBKVxnevdMe9eS0DaVagWfoYZFjSLUw="],["handouts-data/class-notes-17/92.bin",207670,"sha256-HSuIhNmkWwc86PG/J6t8fEbv6lFHy/au52YdfLoZN7Y="],["handouts-data/class-notes-17/93.bin",178114,"sha256-0iPUMay9Vu33Ol173MxYXRUwMR1mAulW0YZgwpWwqAY="],["handouts-data/class-notes-17/94.bin",32012,"sha256-snevl3MEKQuf9NDQAnfYoL6aRysJlANqgVJD5u0Jtw4="],["handouts-data/class-notes-17/95.bin",170774,"sha256-dB9SySwf/MxCUh6jJu32HuCHRAxSdpLiH3Y/Las3WnQ="],["handouts-data/class-notes-17/96.bin",170194,"sha256-UL1Loaa6vYOcwEI8GOnEQhzHGSlT4VQ5dZMQvume158="],["handouts-data/class-notes-17/97.bin",148704,"sha256-XahhJf1vJRlIU7mcIRhJP5hZXCemBB2TDuEHyyHYuVg="],["handouts-data/class-notes-17/98.bin",128024,"sha256-fgx9LGzXy/rQ/sTlRcS6pyhzC/q2BSDiR62s0EFCcLk="],["handouts-data/class-notes-17/99.bin",168272,"sha256-LC1dnINBYaMAAPIKkpmgT0WDPdUnw84ss754c14IQzo="],["handouts-data/class-notes-17/100.bin",153448,"sha256-QW9ledtF/288ah/k/Pp+hOyhgFLebj4WkvR1dIJmSBY="],["handouts-data/class-notes-17/101.bin",153196,"sha256-3v05lpF6RlwQZHDEyKrLJKPCaL80H9FB84sofJmbHiU="],["handouts-data/class-notes-17/102.bin",150402,"sha256-/aSKz6Gqptv2lwXGWNkTWg8cSQpXyqSApqUp21J+oEU="],["handouts-data/class-notes-17/103.bin",168368,"sha256-TU1HgtWQ3/13eP/5vH6SCTHKS+inA1DK5VGcZfAJjeM="],["handouts-data/class-notes-17/104.bin",145882,"sha256-x9RouIaQhP6weEVxA7EfxM3HS59gY/GTziMR0JB+bCU="],["handouts-data/class-notes-17/105.bin",163060,"sha256-JYzChRYcJeTXNo1LO0eSRWcIaYxUUEi2dcR9P+pykx4="],["handouts-data/class-notes-17/106.bin",146004,"sha256-615U11/K6oxbYAWlkyIKFvrlgZhA8UejCkdhKtjV35M="],["handouts-data/class-notes-17/107.bin",154284,"sha256-FPrYCPHtA85vcrr1vIT2ETCYNy0zaT+3dfTmT0pWZek="],["handouts-data/class-notes-17/108.bin",161068,"sha256-7aB9Eoj/4p0TxhYevG5ZSO8afybM89ex21cd62K+SgA="],["handouts-data/class-notes-17/109.bin",174390,"sha256-bSpXs50SWpufbaSwmU95oYlytcrL1wvjm/RKD7SNyfc="],["handouts-data/class-notes-17/110.bin",70508,"sha256-U8FcBzw0iQi6f0sJIRgdKOTWGdLZbfIhVKIX6V+0oeg="],["handouts-data/class-notes-17/111.bin",155436,"sha256-xnH61LdPfU8eSPTqsI1YNP9XksmbJXk5So75Q79JlNs="],["handouts-data/class-notes-17/112.bin",164198,"sha256-tE72lVaXzlxk9MNg0hKBSul56D5G8PzQIzM7nNGXOJs="],["handouts-data/class-notes-17/113.bin",148142,"sha256-w7MPmdctkArxlv0W4j7XG9pUQYgfJGdPRXCmHL+KxRo="],["handouts-data/class-notes-17/114.bin",168278,"sha256-RMdeDCuwfAfX8/i9KHeXjnG1hHKwfCMNxsshlXZg1yo="],["handouts-data/class-notes-17/115.bin",193884,"sha256-NzElP3jz0OIkT+4fe0EneYNKFBYH5lW4hBUg0NCQMK8="],["handouts-data/class-notes-17/116.bin",166450,"sha256-9/KyLMV6yCorFLjM5M1ktFRQa+b7TERWHICR1n8DpjQ="],["handouts-data/class-notes-17/117.bin",160490,"sha256-bfTbjonlF4pryxsKAMpswLw1w2NJvB4GPSmNAWuYILo="],["handouts-data/class-notes-17/text.bin",259122,"sha256-xWvdsr5rqTiHzLqkJjG6JR/3jsOApxZYHfV5AZcWiY8="],["handouts-data/speaking-part1-2026-09/1.bin",161812,"sha256-zxT6CivOOkk4IDTViTBUXxVYa+tKNwLkutHu746QIA4="],["handouts-data/speaking-part1-2026-09/2.bin",155236,"sha256-MRAC4VbY710cV2qaUtn/phondgsUda7SBqpkNv/5vkI="],["handouts-data/speaking-part1-2026-09/3.bin",99530,"sha256-8yI5ODk4LhAL4wckYug0jgc3Vbzr0E/brVsh+L/aQ2k="],["handouts-data/speaking-part1-2026-09/4.bin",178310,"sha256-/WeDkmVcUzi9bAEevMkBt7VMfT1/DKv0PlL2AxfSx6A="],["handouts-data/speaking-part1-2026-09/5.bin",212074,"sha256-Sa0b6z3A1sfMCSKN0y6LQP+CH/fRFJYVUOVIMDVD1oU="],["handouts-data/speaking-part1-2026-09/6.bin",252486,"sha256-brtIQsXvTvTMvde0uzrR12a9Z/2UjQLBYA+ytoXIFO8="],["handouts-data/speaking-part1-2026-09/7.bin",260140,"sha256-RaqVhglACoNYH4eYK46J9KtgjR8hawf1HUf6IgpjkTA="],["handouts-data/speaking-part1-2026-09/8.bin",257344,"sha256-oOUmEBbVQ/r+piHmsFs3UrTL5td+wIitrhKbinKcwEE="],["handouts-data/speaking-part1-2026-09/9.bin",248174,"sha256-4yyRGgfiB+eFqvkxVIeVds3y/6hLpwXtgQyvOtiCz44="],["handouts-data/speaking-part1-2026-09/10.bin",276622,"sha256-QKOV4XxYgvWDbyHI8/t2SPYBWQ3O141qjEo4+TgPDNM="],["handouts-data/speaking-part1-2026-09/11.bin",234078,"sha256-iiJi3xKnBNRG1sqPZhOVfPXtvluEn7LfI1MnA2e8tvw="],["handouts-data/speaking-part1-2026-09/12.bin",232244,"sha256-abD41ruKDIMIXVwRb3g0mxMOxp72X2hb/TJxMu4m04Q="],["handouts-data/speaking-part1-2026-09/13.bin",269458,"sha256-GMuazNUxe6ee5mT3KCEEYH5hZnc31VVSeHyKimLpB2c="],["handouts-data/speaking-part1-2026-09/14.bin",235928,"sha256-AsFCgYmPqeiZIY5mTZ/HWV++cuWemmCflLF491FyGJk="],["handouts-data/speaking-part1-2026-09/15.bin",272090,"sha256-ieO/jZTpklR3yoYFyho8WFQ2V3CAW+RwdOLuvrC/mLU="],["handouts-data/speaking-part1-2026-09/16.bin",248658,"sha256-XPxRPW97aYHX7Bl9C3AQ7xl6qX8tqem1ee8LAzRqFrY="],["handouts-data/speaking-part1-2026-09/17.bin",264484,"sha256-PKurMd8rLjE7AtLE0/qyq9el9LVuVckx0jDe2wd5EYU="],["handouts-data/speaking-part1-2026-09/18.bin",251158,"sha256-L4buqWM5VxQyIABjG5Wi1qolqtUXaAh4AV34el/nPQU="],["handouts-data/speaking-part1-2026-09/19.bin",272926,"sha256-faMAceldR+F9WfOMgABiJUi4dLT8yfMap9/ipoNQcWI="],["handouts-data/speaking-part1-2026-09/20.bin",260750,"sha256-7cIEuTg/NSRDNWiP4xZ2CXFDIZcIvfVk7pn52/Lhkpc="],["handouts-data/speaking-part1-2026-09/21.bin",269468,"sha256-L7ERJfHSwetXKTcNi+Ec2arA7GQEY+OUNpHPUP2SfxM="],["handouts-data/speaking-part1-2026-09/22.bin",259324,"sha256-TpRrDADUVbtq5vZ5KQwK1rcSsP8dYHPz0J+kSb0WjbM="],["handouts-data/speaking-part1-2026-09/23.bin",248254,"sha256-lKOgiC8zbHs1iVa7LZCDnKxijo1lCgPWyPRN4xzbSpY="],["handouts-data/speaking-part1-2026-09/24.bin",224206,"sha256-DcyegaJchjMWTdGkO6+ObSvKPGUFKTm7htBcOBkZIVk="],["handouts-data/speaking-part1-2026-09/25.bin",227068,"sha256-X2Ql9Pese4/O0ojSVikMcs82EjZ8owLJ92cPItfZjy8="],["handouts-data/speaking-part1-2026-09/26.bin",244102,"sha256-r5o2Se221uPtVcNewZZA4uBjPwsjypFmJDiWmGkuz5E="],["handouts-data/speaking-part1-2026-09/27.bin",268834,"sha256-tVwlXBrM+tifOKhqXzvEOg5CVc2L3Pfq70QNRLnJbwk="],["handouts-data/speaking-part1-2026-09/28.bin",231206,"sha256-Di37/F7ZjyyyR9FSkGP5xknCJ4uP1ELo02gH0/mKlBY="],["handouts-data/speaking-part1-2026-09/29.bin",232890,"sha256-Bfck9w3alhIXDCH7jLQLnMwSiL61pzQY+OpHnnRQJgM="],["handouts-data/speaking-part1-2026-09/30.bin",237212,"sha256-O1fPMzJ2eOyJY3W6Fddgw92cfUN14O+M71cObEz58yw="],["handouts-data/speaking-part1-2026-09/31.bin",234344,"sha256-sgRwjtrOf3BA6zK48AyO4nQkATb32u4xY8CE2YwVm24="],["handouts-data/speaking-part1-2026-09/32.bin",229850,"sha256-a0trMxFPp79S5+I56k4ThfuaSc8P/8+AFsm41FFCc9I="],["handouts-data/speaking-part1-2026-09/33.bin",241016,"sha256-Mv3ILTPjdtmaA0budZ9SFXUkCez1AGDhZA7xbx+Hxok="],["handouts-data/speaking-part1-2026-09/34.bin",211032,"sha256-XWHjkRM3NlRb36vJKmiSsXzcTFxKvaSQy9DlwQ83mAs="],["handouts-data/speaking-part1-2026-09/35.bin",227966,"sha256-XkFoK2dnWX0S5dEqJb+NDAqryAlnfOeEy3x37S/wU9Q="],["handouts-data/speaking-part1-2026-09/36.bin",233574,"sha256-KrvMmqpcWcayb+ZDas3XE8ShFnfp4zWOD8TW32Pwo40="],["handouts-data/speaking-part1-2026-09/37.bin",235572,"sha256-W7upFJdsiW75xz+D5zU4LI9uFN4T9Q6vBaJwW7IF8Nc="],["handouts-data/speaking-part1-2026-09/38.bin",222502,"sha256-VYgUgyvY1xRjI605wcJ3xNo4M64/vXF6woKUoDLSd44="],["handouts-data/speaking-part1-2026-09/39.bin",230014,"sha256-Bnqcr6Pzk93VeQQM9xEHlLzTH61H8uUdEXwmbQytv5U="],["handouts-data/speaking-part1-2026-09/40.bin",207092,"sha256-0zY08INoL+RkcpeQRWbOBPgy2Zi0ZNwcuWbRdvOH4mc="],["handouts-data/speaking-part1-2026-09/text.bin",80742,"sha256-oWxtIK3XjKilMj86Re+CJh5Q2PbBXFMb9qd3GeiUmZM="],["bbc-media/chocolate.mp3",6086688,"sha256-Tc1owMoK4Wqhxf7S7hLPGCbn24pLxzPSvzQcXkirUXs=","https://downloads.bbc.co.uk/learningenglish/features/6min/260312_should_we_pay_more_for_chocolate_download.mp3"],["bbc-media/chocolate.pdf",139786,"sha256-9EGhHla+QErgzU4zTXtc2AxQcVgD6/6yTaR5Dv3c8iU=","https://downloads.bbc.co.uk/learningenglish/features/6min/260312_should_we_pay_more_for_chocolate__transcript_.pdf"],["bbc-media/languages.mp3",7372992,"sha256-z274m9ikZ/jjhUAJnjY8NXMkMVmoHa4O+fQWkwEbA1s=","https://downloads.bbc.co.uk/learningenglish/features/6min/250410_6_minute_english_learning_multiple_languages_download.mp3"],["bbc-media/languages.pdf",136736,"sha256-XlB0WPiBkiP724htu2MQ689Su8dUq4Uu8XCQJTxV3UM=","https://downloads.bbc.co.uk/learningenglish/features/6min/250410_6_minute_english_learning_multiple_languages.pdf"]];
const scope = new URL(self.registration.scope);
const cacheName = 'shike-materials-v1:' + scope.pathname;
const entries = new Map();
for (const [path,size,integrity,source] of materials) {
  const url = new URL(path,scope);
  url.searchParams.set('asset',integrity.slice(7));
  entries.set(url.pathname,{key:url.href,size,integrity,source,name:path.split('/').pop()});
}
const all = Array.from(entries.values());
const totalBytes = all.reduce((sum,file)=>sum+file.size,0);
const downloads = new Map();
const tabState = new URL('__open-material-tabs__',scope).href;
let tabFiles;
function openTabFiles(cache) {
  return tabFiles ||= cache.match(tabState).then(response=>response ? response.json() : {});
}

self.addEventListener('notificationclick',event=>{
  const data = event.notification.data;
  if (data?.kind !== 'shike-focus') return;
  event.notification.close();
  event.waitUntil((async()=>{
    const windows = (await self.clients.matchAll({type:'window',includeUncontrolled:true}))
      .filter(client=>client.url.startsWith(scope.href));
    const existing = windows.find(client=>client.visibilityState==='visible') || windows[0];
    if (existing) { await existing.focus(); return; }
    const url = new URL(scope);
    if (/^\d{4}-\d{2}-\d{2}$/.test(data.date)) url.searchParams.set('date',data.date);
    url.hash = 'checkin';
    await self.clients.openWindow(url.href);
  })());
});

async function download(file) {
  const response = await fetch(file.source || file.key,{integrity:file.integrity,credentials:'omit',redirect:'error'});
  if (response.status !== 200) throw new Error('资料暂时不能下载，请稍后重试。');
  if (!file.source) return response;
  // Return a same-origin representation for the native PDF and audio readers.
  return new Response(response.body,{headers:{
    'Content-Type':file.name.endsWith('.mp3')?'audio/mpeg':'application/pdf',
    'Content-Length':String(file.size),'Accept-Ranges':'bytes'
  }});
}

// Opening a lesson can join its active download or start one ahead of the bulk queue.
function store(cache,file) {
  if (downloads.has(file.key)) return downloads.get(file.key);
  const operation = (async () => {
    if (await cache.match(file.key)) return;
    const response = await download(file);
    await cache.put(file.key,response);
  })().finally(()=>downloads.delete(file.key));
  downloads.set(file.key,operation);
  return operation;
}

async function cachedFile(request,file,clientId) {
  let cache;
  try { cache = await caches.open(cacheName); } catch { return file.source ? download(file) : fetch(request); }
  try {
    // Previously opened documents may still request their original JS, CSS or player.
    if (clientId && request.mode !== 'navigate') {
      const saved = (await openTabFiles(cache))[clientId]?.[new URL(file.key).pathname];
      if (saved) {
        const previous = await cache.match(saved);
        if (previous) return previous;
      }
    }
    const found = await cache.match(file.key);
    if (found) return found;
    await store(cache,file);
    const stored = await cache.match(file.key);
    if (stored) return stored;
  } catch (error) {
    // Storage can be full or disabled. Keep normal online practice available.
    // A network/integrity failure must never put a different release under this key.
    if (error instanceof TypeError) throw error;
  }
  return download(file);
}

async function serveMedia(request,file) {
  const response = await cachedFile(request,file);
  const headers = new Headers(response.headers);
  if (request.method === 'HEAD') return new Response(null,{headers});
  const match = /^bytes=(\d*)-(\d*)$/i.exec(request.headers.get('range') || '');
  if (!match || !match[1] && !match[2]) return response;
  const start = match[1] ? Number(match[1]) : Math.max(0,file.size-Number(match[2]));
  const end = match[1] && match[2] ? Math.min(file.size-1,Number(match[2])) : file.size-1;
  if (start > end || start >= file.size) {
    return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+file.size}});
  }
  headers.set('Content-Range','bytes '+start+'-'+end+'/'+file.size);
  headers.set('Content-Length',String(end-start+1));
  return new Response((await response.blob()).slice(start,end+1),{status:206,headers});
}

self.addEventListener('fetch',event=>{
  const request = event.request;
  if (!['GET','HEAD'].includes(request.method) || request.headers.has('authorization')) return;
  const url = new URL(request.url);
  if (url.origin !== scope.origin) return;
  const path = url.pathname === scope.pathname ? scope.pathname+'index.html' : url.pathname;
  const file = entries.get(path);
  if (file?.source) event.respondWith(serveMedia(request,file));
  else if (file && request.method === 'GET' && !request.headers.has('range')) event.respondWith(cachedFile(request,file,event.clientId));
});

async function runQueue(files,work) {
  let cursor = 0, failure;
  async function run() {
    while (!failure && cursor < files.length) {
      const file = files[cursor++];
      try { await work(file); } catch (error) { failure = error; }
    }
  }
  await Promise.all([run(),run(),run()]);
  if (failure) throw failure;
}

// During an update keep the old worker and cache intact until replacements for
// previously saved files have been verified and written. Unchanged media stay in place.
self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    if (!await caches.has(cacheName)) return;
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    const present = new Set(keys.map(key=>key.url));
    const oldPaths = new Set(keys.map(key=>new URL(key.url).pathname));
    const replacements = all.filter(file=>!present.has(file.key) && oldPaths.has(new URL(file.key).pathname));
    await runQueue(replacements.filter(file=>!file.source),file=>store(cache,file));
    await Promise.allSettled(replacements.filter(file=>file.source).map(file=>store(cache,file)));
  })().then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const cache = await caches.open(cacheName);
    const keep = new Set(all.map(file=>file.key));
    const retired = (await cache.keys()).filter(key=>key.url !== tabState && !keep.has(key.url));
    const previous = await openTabFiles(cache);
    const oldKeys = new Set(Object.values(previous).flatMap(files=>Object.values(files)));
    // skipWaiting transfers the old controller's clients before activation. Pages
    // loaded from the network without a controller already have the current HTML.
    const windows = await self.clients.matchAll({type:'window'});
    const next = {};
    for (const client of windows) {
      const files = {...previous[client.id]};
      for (const key of retired) {
        const path = new URL(key.url).pathname;
        if (!oldKeys.has(key.url) && !files[path] && entries.has(path) && !entries.get(path).source) files[path] = key.url;
      }
      for (const path of Object.keys(files)) if (keep.has(files[path])) delete files[path];
      if (Object.keys(files).length) next[client.id] = files;
    }
    if (Object.keys(next).length) await cache.put(tabState,Response.json(next));
    else await cache.delete(tabState);
    tabFiles = Promise.resolve(next);
    for (const files of Object.values(next)) for (const key of Object.values(files)) keep.add(key);
    for (const key of retired) if (!keep.has(key.url)) await cache.delete(key);
    await self.clients.claim();
  })());
});

async function inventory(cache) {
  const saved = new Set((await cache.keys()).map(key=>key.url));
  const missing = all.filter(file=>!saved.has(file.key));
  const bbcFiles = all.filter(file=>file.source && saved.has(file.key)).map(file=>file.name);
  return {missing,progress:{total:all.length,done:all.length-missing.length,bytes:totalBytes,bbcFiles,
    savedBytes:totalBytes-missing.reduce((sum,file)=>sum+file.size,0)}};
}

const listeners = new Set();
let preload;
async function downloadAll(cache) {
  const {missing,progress} = await inventory(cache);
  const announce = () => {
    for (const port of listeners) port.postMessage({type:'progress',progress});
  };
  announce();
  async function save(file) {
    await store(cache,file);
    progress.done++;
    progress.savedBytes += file.size;
    if (file.source) progress.bbcFiles.push(file.name);
    announce();
  }
  await runQueue(missing.filter(file=>!file.source),save);
  const bbc = await Promise.allSettled(missing.filter(file=>file.source).map(save));
  const failed = bbc.find(result=>result.status==='rejected');
  if (failed) {
    if (failed.reason?.name === 'QuotaExceededError') throw failed.reason;
    throw new Error('本站课程资料已保存，部分 BBC 节目未能下载，可以稍后继续。');
  }
  const result = await inventory(await caches.open(cacheName));
  if (result.missing.length) throw new Error('资料保存中断，已保存的部分可继续使用。');
  return result.progress;
}

self.addEventListener('message',event=>{
  const port = event.ports[0], type = event.data?.type;
  if (!port || !['material-status','material-preload'].includes(type)) return;
  event.waitUntil((async()=>{
    try {
      const cache = await caches.open(cacheName);
      let result;
      if (type === 'material-status') result = (await inventory(cache)).progress;
      else {
        listeners.add(port);
        if (!preload) preload = downloadAll(cache).finally(()=>{preload = undefined;});
        result = await preload;
      }
      port.postMessage({type:'done',progress:result});
    } catch (error) {
      const message = error.name === 'QuotaExceededError' ? '设备存储空间不足。腾出空间后可以继续下载。'
        : error instanceof TypeError ? '网络中断或资料正在更新，可以稍后继续下载。'
        : error.name === 'Error' ? error.message : '浏览器未能保存资料，请检查可用空间后重试。';
      port.postMessage({type:'error',message});
    } finally {
      listeners.delete(port);
      port.close();
    }
  })());
});
