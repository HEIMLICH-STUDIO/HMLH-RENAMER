/**
 * 앱 상태 관리
 * 전역 상태 및 히스토리 관리를 담당하는 모듈입니다.
 */

// 상태 객체
const State = {
  // 파일 관련 상태
  selectedFiles: [],
  currentMethod: 'pattern', // 기본 메소드
  toastTimeout: null,       // 토스트 타이머
  lastRenameResults: null,  // 마지막 이름 변경 결과
  pendingSaveCallback: null, // 모달 콜백 저장용
  mediaCache: {},           // 미디어 메타데이터 캐시 {filePath: {width, height, duration, isImage, isVideo}}
  
  // 단어 방식 관련 상태
  wordRules: [],           // 단어 변경 규칙
  selectedWordTokens: [],  // 선택된 단어 토큰
  wordPatterns: [],        // 일괄 적용용 패턴
  lastSelectedWord: null,  // 마지막으로 선택한 단어 (연속 선택용)
  treatSelectionAsOne: false, // 연속 선택을 하나의 단어로 취급
  applySimilarPattern: false, // 유사한 파일명 패턴에만 적용
  selectedGroups: [],      // 연속 선택된 단어 그룹
  
  // 히스토리 관련 상태
  fileHistory: [],         // 파일 목록 변경 히스토리
  historyIndex: -1,        // 현재 히스토리 인덱스
  MAX_HISTORY: 50,         // 최대 히스토리 저장 개수
  isUndoRedoAction: false, // undo/redo 작업 중 여부
  initialState: null,      // 초기 상태 저장
  
  // 저장된 규칙
  savedRules: {},
  
  // 정렬 진행 중인지 추적하는 플래그
  isSorting: false,
  
  // 상태 초기화
  resetState() {
    this.selectedFiles = [];
    this.currentMethod = 'pattern';
    this.toastTimeout = null;
    this.lastRenameResults = null;
    this.pendingSaveCallback = null;
    this.wordRules = [];
    this.selectedWordTokens = [];
    this.wordPatterns = [];
    this.lastSelectedWord = null;
    this.fileHistory = [];
    this.historyIndex = -1;
    this.isUndoRedoAction = false;
    this.initialState = null;
    this.mediaCache = {};
    this.isSorting = false;
    
    // 저장된 규칙은 초기화하지 않음
    
    try {
      // 로컬 스토리지에서 저장된 규칙 불러오기
      const savedRulesStr = localStorage.getItem('savedRules');
      if (savedRulesStr) {
        this.savedRules = JSON.parse(savedRulesStr);
      }
    } catch (error) {
      console.error('Failed to load saved rules:', error);
      this.savedRules = {};
    }
  },
  
  // 앱 상태 내보내기 (디버깅용)
  exportState() {
    return {
      selectedFiles: this.selectedFiles.length,
      currentMethod: this.currentMethod,
      wordRules: this.wordRules.length,
      historyIndex: this.historyIndex,
      historyLength: this.fileHistory.length
    };
  }
};

export default State; 