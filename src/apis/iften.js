const app = {
  initialize() {
    this.bindEvents();
  },
  bindEvents() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('pause', this.onPause, false);
    document.addEventListener('resume', this.onResume, false);
  },

  // 기기가 사용할 준비가 되었을 경우
  onDeviceReady() {
    // alert('onDeviceReady');
    navigator.splashscreen.hide();
    const { permissions } = cordova.plugins;
    const permissionList = [
      // 저장공간 읽기 권한
      permissions.READ_EXTERNAL_STORAGE,
      // 저장공간 쓰기 권한
      permissions.WRITE_EXTERNAL_STORAGE,
    ];

    // alert(permissions.checkPermission);
    try {
      // 권한 요청
      permissions.checkPermission(permissionList, this.onHasPermission, this.errorCallback);
    } catch (e) {
      alert('permissions error');
      alert(e);
    }
  },

  // 권한이 있을 경우
  onHasPermission(status) {
    if (!status.hasPermission) {
      permissions.requestPermissions(permissionList, (data) => { console.log(data); }, (err) => { console.log(`err:${err}`); });
    }
  },
  // 기기가 중지 되었을 때
  onPause() {
    // alert('onPause');
  },

  // 휴대폰이 정지상태에서 돌아왔을 때
  onResume() {
    // alert('onResume');
  },

  // 요청 응답 획득 시 작업
  successCallback(outJson) {
    // alert(outJson);
  },

  // 에러 응답시 작업
  errorCallback(err) {
    alert(err);
  },

  // 스크래핑 실행
  startEngine(inJson, successCallback, errorCallback) {
    const outJson = {};
    outJson.orgCd = 'gov';
    outJson.svcCd = 'A0001';
    outJson.errYn = 'N';
    outJson.errMsg = '';
    const err = false;
    const errMsg = 'ERROR';
    if (!err) {
      successCallback(JSON.stringify(outJson));
    } else {
      errorCallback(errMsg);
    }
  },
  // 모바일 기기에 저장된 인증서 파일의 목록을 불러옴
  certList(inJson, successCallback, errorCallback) {
    const infoArray = [];
    const info = {};
    info.subjectDN = 'CN=인증서()001023321312312351243123123';
    info.issuerKName = '인증서발급사';
    info.oidName = '은행/신용카드/보험(개인)';
    info.notAfter = '2020.01.01';
    info.certPath = 'signCert.der경로';
    info.keyPath = 'signCert.key경로';
    infoArray.push(info);

    const err = false;
    const errMsg = 'ERROR';
    if (!err) {
      successCallback(infoArray);
    } else {
      errorCallback(errMsg);
    }
  },
  // 인증서 파일을 Base64로 변환 후 출력
  getCertInfo(inJson, successCallback, errorCallback) {
    const outJson = {};
    outJson.signPri = 'signPri_Base64';
    outJson.signKey = 'signKey_Base64';
    const err = false;
    const errMsg = 'ERROR';
    if (!err) {
      successCallback(JSON.stringify(outJson));
    } else {
      errorCallback(errMsg);
    }
  },
  // 인증서 비밀번호를 체크
  checkPassword(inJson, successCallback, errorCallback) {
    // 패스워드가 맞을 시 true 반환, 틀릴 경우 false 반환
    const successOrError = true;
    const err = false;
    const errMsg = 'ERROR';
    if (!err) {
      successCallback(successOrError);
    } else {
      errorCallback(errMsg);
    }
  },
  // 서버로부터 인증서 가져오기
  copyCert(inJson, uuid, successCallback, errorCallback) {
    const successOrError = true;
    const err = false;
    const errMsg = 'ERROR';
    if (!err) {
      successCallback(successOrError);
    } else {
      errorCallback(errMsg);
    }
  },
};

export default app;
