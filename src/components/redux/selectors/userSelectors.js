export const selectUsersPage = (state) => state.usersPage;

export const selectTotalUsersCount = (state) => state.usersPage.totalUsersCount;
export const selectPageSize = (state) => state.usersPage.pageSize;
export const selectCurrentPage = (state) => state.usersPage.currentPage;
export const selectFollowingInProgress = (state) => state.usersPage.followingInProgress;
