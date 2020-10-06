import { ironMemberInfo } from './fake-info.js'



const WebCampFinish = document.querySelector('.web-camp-member-finish')
const WebCampUnfinish = document.querySelector('.web-camp-member-unfinish')
const BackendCamp = document.querySelector('.backend-camp-member')
const AndroidCamp = document.querySelector('.android-camp-member')
const IosCamp = document.querySelector('.ios-camp-member')

function filterCamp() {
  const iosCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "iOS")
  const androidCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "Android")
  const backendCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "Backend")
  const webCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "Web")
  return { iosCamp, androidCamp, backendCamp, webCamp}
}

// Object.entries(filterCamp()).map(camp=>{
//   console.log(camp[1])
//   FinishStatus(camp[1])
// })

// for(camp in filterCamp()){
//   filterCamp[camp] = FinishStatus(camp)
// }

function FinishStatus(data) {
  const finish =data.filter(item=>item.hasFinishedToday)
  const unfinish =data.filter(item=>!item.hasFinishedToday)
  return{
    finish,
    unfinish
  }
}
// 解構賦值
function render({iosCamp, androidCamp, backendCamp, webCamp}) {
 const iosFin = FinishStatus(iosCamp).finish
 const iosUnfin = FinishStatus(iosCamp).unfinish
 WebCampFinish.innerHTML = iosFin.map(MemberData => {
  return creatMemberInfo(MemberData)
}).join('');
WebCampUnfinish.innerHTML = iosUnfin.map(MemberData => {
  return creatMemberInfo(MemberData)
}).join('');
}

//   BackendCamp.innerHTML = backendCamp.map(MemberData => {
//     return creatMemberInfo(MemberData)
//   }).join('');
//   AndroidCamp.innerHTML = androidCamp.map(MemberData => {
//     return creatMemberInfo(MemberData)
//   }).join('');
//   IosCamp.innerHTML = iosCamp.map(MemberData => {
//     return creatMemberInfo(MemberData)
//   }).join('');
// }
// 呼叫 render function 並把 filterCamp 當作傳入值傳入
render( filterCamp())
// async function getApi() {
//   // 等到 fetch 完成後才會執行下一件事情
//   const response = await fetch('https://goodideas-studio-ironman-api.kenchenisme.com/',{method: 'GET'})
//   // console.log(response)
//   return response.json()
// }

// async function getMemberInfo() {
//   const ironmanData = await getApi() 
//   MemberInfo.innerHTML = ironmanData.data.map(MemberData => {
//     return creatMemberInfo(MemberData)
//   }).join('')
// }

// ==================
// const MemberInfo = document.querySelector('.member')

// MemberInfo.innerHTML = ironMemberInfo.map(MemberData => {
//   return creatMemberInfo(MemberData)
// }).join('')
// ==================

function creatMemberInfo(MemberData) {
  return `
  <div class="member-info">
    <div class="member-info-avatar">
      <img src="./image/woman.png" alt="avatar">
    </div>
    <div class="member-info-content">
      <div class="name">
        <span>${MemberData.name}</span>
      </div>
      <div class="subject">
        <span>主題：</span>
        <a href="${MemberData.ironmanUrl}">${MemberData.subject}</a>
      </div>
      <div class="article">
        <span>文章：</span>
        <a href="##">5個常用錯的CSS語法</a>
      </div>
      <div class="last-release">
        <div class="last-release-time">
          <span>上次發文時間：</span>
          <time>2020-09-02 08:00</time>
        </div>
        <div class="last-release-post">
          <span>累積貼文數：</span>
          <span>09</span>
        </div>
      </div>
    </div>
  </div>`
}

// getMemberInfo()