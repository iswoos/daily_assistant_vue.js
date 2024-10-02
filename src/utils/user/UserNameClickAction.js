// UserNameClickAction.js
export class UserNameClickAction {
  static activeUserId = null // 클릭된 사용자 ID 상태 관리

  static nameClickAction(userId) {
    if (this.activeUserId === userId) {
      this.activeUserId = null // 같은 유저 클릭 시 리스트 닫기
    } else {
      this.activeUserId = userId // 새 유저 클릭 시 ID 업데이트
    }
    return this.activeUserId
  }
}
