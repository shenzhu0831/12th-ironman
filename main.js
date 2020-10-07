import { ironMemberInfo } from './fake-info.js'



const WebCampFinish = document.querySelector('.web-camp-member-finish')
const WebCampUnfinish = document.querySelector('.web-camp-member-unfinish')
const BackendCampFinish = document.querySelector('.backend-member-finish')
const BackendCampUnfinish = document.querySelector('.backend-member-unfinish')
const AndroidCampFinish = document.querySelector('.android-member-finish')
const AndroidCampUnfinish = document.querySelector('.android-member-unfinish')
const IosCampFinish = document.querySelector('.ios-member-finish')
const IosCampUnfinish = document.querySelector('.ios-member-unfinish')

function filterCamp() {
  const iosCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "iOS")
  const androidCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "Android")
  const backendCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "Backend")
  const webCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "Web")
  return { iosCamp, androidCamp, backendCamp, webCamp}
}

// console.log(filterCamp())

const PostStatus = Object.entries(filterCamp()).map(everyCamp=>{
  // console.log(camp[1])
  return FinishStatus(everyCamp[1])
})

// for(camp in filterCamp()){
//   filterCamp[camp] = FinishStatus(camp)
// }

function FinishStatus(everyCamp) {
  const finish =everyCamp.filter(item=>item.hasFinishedToday)
  const unfinish =everyCamp.filter(item=>!item.hasFinishedToday)
  return{
    finish,
    unfinish
  }
}

// 解構賦值
function render([iosCamp, androidCamp, backendCamp, webCamp]) {
  // =========== Web 發文狀態 =========== //
  const webFin = webCamp.finish
  const webUnfin = webCamp.unfinish
  WebCampFinish.innerHTML = webFin.map(MemberData => {
  return creatMemberInfo(MemberData)
  }).join('');
  WebCampUnfinish.innerHTML = webUnfin.map(MemberData => {
    return creatMemberInfo(MemberData)
  }).join('');
  // =========== Backend 發文狀態 =========== //
  const backendFin = backendCamp.finish
  const backendUnfin = backendCamp.unfinish
  BackendCampFinish.innerHTML = backendFin.map(MemberData => {
  return creatMemberInfo(MemberData)
  }).join('');
  BackendCampUnfinish.innerHTML = backendUnfin.map(MemberData => {
    return creatMemberInfo(MemberData)
  }).join('');
  // =========== Android 發文狀態 =========== //
  const androidFin = androidCamp.finish
  const androidUnfin = androidCamp.unfinish
  AndroidCampFinish.innerHTML = androidFin.map(MemberData => {
  return creatMemberInfo(MemberData)
  }).join('');
  AndroidCampUnfinish.innerHTML = androidUnfin.map(MemberData => {
    return creatMemberInfo(MemberData)
  }).join('');
  // =========== Ios 發文狀態 =========== //
  const iosFin = iosCamp.finish
  const iosUnfin = iosCamp.unfinish
  IosCampFinish.innerHTML = iosFin.map(MemberData => {
  return creatMemberInfo(MemberData)
  }).join('');
  IosCampUnfinish.innerHTML = iosUnfin.map(MemberData => {
    return creatMemberInfo(MemberData)
  }).join('');
}

// 呼叫 render function 並把 filterCamp 當作傳入值傳入
render( PostStatus )
async function getApi() {
  // 等到 fetch 完成後才會執行下一件事情
  const response = await fetch('https://goodideas-studio-ironman-api.kenchenisme.com/',{method: 'GET'})
  // console.log(response)
  return response.json()
}

async function getMemberInfo() {
  const ironmanData = await getApi() 
  MemberInfo.innerHTML = ironmanData.data.map(MemberData => {
    return creatMemberInfo(MemberData)
  }).join('')
}

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