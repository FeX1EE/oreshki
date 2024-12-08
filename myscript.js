function toHex(n){
    n=Number(n)
    s=''
    while(n>0)
    {
        v=String(n%16)
        switch (v)
        {
            case ('10'):
                s='A'+s
                break
            case ('11'):
                s='B'+s
                break
            case ('12'):
                s='C'+s
                break
            case ('13'):
                s='D'+s
                break
            case ('14'):
                s='E'+s
                break
            case ('15'):
                s='F'+s
                break
            default:
                s=v+s
                break
        }
        n=(n-(n%16))/16
    }
    switch (s.length)
    {
        case 0:
            s='00'
            break
        case 1:
            s='0'+s
            break
    }
    return s
}
function setCookies(pLen)
{
    let field=''
    elms=document.querySelectorAll('.Klt')
    for(let i2 = 0; i2<pLen;++i2)
    {
        elm=elms[i2].style.backgroundColor
        let rgbns = elm.split("(")[1].split(")")[0]
        console.log(rgbns)
        rgbns=rgbns.split(',')
        tos=toHex(Number(rgbns[0]))+toHex(Number(rgbns[1]))+toHex(Number(rgbns[2]))
        field+=tos
        
    }
    document.cookie = `field=${field};max-age=600`
    if (field!='')
    {
        document.cookie = `isfield=${true};max-age=600`
    }
    else
    {
        document.cookie = `isfield=${false};max-age=600`
    }
}
function setCookiesE(pLen,col)
{
    let field=''
    elms=document.querySelectorAll('.Klt')
    for(let i2 = 0; i2<pLen;++i2)
    {
        tos=toHex(Number(col[1]+col[2]))+toHex(Number(col[3]+col[4]))+toHex(Number(col[5]+col[6]))
        field+=tos
        
    }
    document.cookie = `field=${field};max-age=600`
    if (field!='')
    {
        document.cookie = `isfield=${true};max-age=600`
    }
    else
    {
        document.cookie = `isfield=${false};max-age=600`
    }
}
//console.log(Number('0x'+toHex(1024)))
let wdt = 30
let hgt = 15
let colorN='rgb(0, 0, 0)'
let colorG = ["#FF0000", "#FF7700", "#FFFF00","#00FF00","#0000FF","#AA00AA","#FFFFFF","#000000"]
let btns = document.querySelectorAll(".Kt")
let ktz = document.querySelector(".Ktz")
let bdy = document.querySelector("Body")
let mdwn=false
let filling=false
let dccs = document.cookie.split('; ')
let cookis=false
for (let i1=0;i1<dccs.length;++i1)
{
    dccst=dccs[i1].split('=')
    if (dccst[0]=='isfield')
    {
        if (dccst[1]=='true')
        {
            cookis=true
        }
    }
}
bdy.addEventListener('mousedown',function(){mdwn=true})
bdy.addEventListener('mouseup',function(){mdwn=false})
ktz.addEventListener('click',function(){
    if (filling)
    {
        filling=false
        ktz.src='https://cdn-icons-png.flaticon.com/512/2062/2062844.png'
        ktz.style.backgroundColor='#222222'
    }
    else
    {
        filling=true
        ktz.src='https://cdn-icons-png.flaticon.com/512/103/103458.png'
        if (colorN=='rgb(0, 0, 0)')
        {
            ktz.style.backgroundColor='#888888'
        }
        else
        {
            ktz.style.backgroundColor=colorN
        }
    }
})
for(let i3 = 0; i3<btns.length;++i3)
{
    btns[i3].style.backgroundColor=colorG[i3]
}
for(let i3 = 0; i3<btns.length;++i3)
{
    btns[i3].addEventListener("click",function(){
        colorN=this.style.backgroundColor
        if(filling)
        {
            console.log(colorN)
            if (colorN=='rgb(0, 0, 0)')
            {
                ktz.style.backgroundColor='#888888'
            }
            else
            {
                ktz.style.backgroundColor=colorN
            }
        }
    })
}
for(let i1 = 0; i1<wdt;++i1)
{
    for(let i2 = 0; i2<hgt;++i2)
    {
        let para = document.createElement("div");
        let element = document.querySelector(".MainField")
        let pCord=i1*hgt+i2
        let pLen=wdt*hgt
        para.className='Klt'
        if(cookis)
        {
            let getEl=''
            let cFld=''
            let cCs = document.cookie.split('; ')
            //console.log(cCs)
            for (let i2 = 0;i2<cCs.length;++i2)
            {
                let cFlds=cCs[i2].split('=')
                if (cFlds[0]=='field')
                {
                    cFld=cFlds[1]
                    //console.log(cFld)
                    rout=true
                    break
                }
            }
            for (let i1=0;i1<6;++i1)
            {
                getEl+=cFld[(pCord*6)+i1]
            }
            //console.log(getEl)
            para.style.backgroundColor=('#'+getEl)
        }
        else
        {
            para.style.backgroundColor='#000000'
        }
        element.appendChild(para);
        para.addEventListener("click",function(){
            if (filling)
            {
                let col = this.style.backgroundColor
                console.log('save')
                setCookiesE(pLen,col)
                anime({
                    targets: '.MainField .Klt',
                    scale: [
                        {value: 1.1, easing: 'easeOutSine', duration: 50},
                        {value: 1, easing: 'easeInOutQuad', duration: 100}
                    ],
                    backgroundColor: [
                        {value: this.style.backgroundColor, easing: 'easeOutSine', duration: 50},
                        {value: colorN, easing: 'easeInOutQuad', duration: 100}
                    ],
                    delay: anime.stagger(20, {grid: [wdt, hgt], from: pCord})
                })
            }
            else
            {
                this.style.backgroundColor=colorN
                console.log('save')
                setCookies(pLen)
            }
            
        })
        para.addEventListener("mouseover",function(){
            if(mdwn & !filling)
            {
                this.style.backgroundColor=colorN
            }
        })
        para.addEventListener('mouseup',function(){
            console.log('save')
            setCookies(pLen)
        })
    }
}