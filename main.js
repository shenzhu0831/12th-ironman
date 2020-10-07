// 選取元素
const WebCampFinish = document.querySelector('.web-camp-member-finish')
const WebCampUnfinish = document.querySelector('.web-camp-member-unfinish')
const BackendCampFinish = document.querySelector('.backend-member-finish')
const BackendCampUnfinish = document.querySelector('.backend-member-unfinish')
const AndroidCampFinish = document.querySelector('.android-member-finish')
const AndroidCampUnfinish = document.querySelector('.android-member-unfinish')
const IosCampFinish = document.querySelector('.ios-member-finish')
const IosCampUnfinish = document.querySelector('.ios-member-unfinish')
const LoadingView = document.querySelector('.loading-container')


function filterCamp(ironMemberInfo) {
  const iosCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "iOS")
  const androidCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "Android")
  const backendCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "Backend")
  const webCamp =  ironMemberInfo.filter(CampsItems=>CampsItems.camp === "Web")
  return { iosCamp, androidCamp, backendCamp, webCamp}
}

function FinishStatus(everyCamp) {
  const finish =everyCamp.filter(item=>item.hasFinishedToday)
  const unfinish =everyCamp.filter(item=>!item.hasFinishedToday)
  return{
    finish,
    unfinish
  }
}

// 解構資料
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

async function getApi() {
  // 等到 fetch 完成後才會執行下一件事情
  const response = await fetch('https://goodideas-studio-ironman-api.kenchenisme.com/',{method: 'GET'})
  // console.log(response)
  return response.json()
}

async function getMemberInfo() {
  LoadingView.classList.add('is-show')
  const ironmanData = await getApi() 
  LoadingView.classList.remove('is-show')

  const PostStatus = Object.entries(filterCamp(ironmanData.data)).map(everyCamp=>{
    return FinishStatus(everyCamp[1])
  })
  render( PostStatus )
}

function creatMemberInfo(MemberData) {
  let DateFormat = new Date(MemberData.lastFinishedDatetime)
    .toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replaceAll('/', '-')
  return `
  <div class="member-info">
    <div class="member-info-avatar">
      <img src="${MemberData.avatar}" alt="avatar">
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
        <a href="${MemberData.lastArticleLink}">${MemberData.lastArticleSubject}</a>
      </div>
      <div class="last-release">
        <div class="last-release-time">
          <span>上次發文時間：</span>
          <time>${DateFormat}</time>
        </div>
        <div class="last-release-post">
          <span>累積貼文數：</span>
          <span>${MemberData.topicCount}</span>
        </div>
      </div>
    </div>
  </div>`
}

getMemberInfo()