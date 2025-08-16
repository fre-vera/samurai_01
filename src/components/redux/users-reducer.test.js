import { usersReducer } from './users-reducer';
import { followAC } from './users-reducer';
import { setCurrentPageAC } from './users-reducer';
import { setTotalUsersCountAC } from './users-reducer';
import { unFollowAC } from './users-reducer';
import { setIsUsersLoadingAC } from './users-reducer';
import { toggleFollowingProgress } from './users-reducer';
import { setUsersAC } from './users-reducer';

describe('usersReducer', () => {
  let state;

  const userId = 123;
  const currentPage = 5;
  const totalUsersCount = 10;
  const isUsersLoading = true;
  const newUsers = [
    { id: 5454, followed: false },
    { id: 5252, followed: true },
  ];

  beforeEach(() => {
    state = {
      users: [
        { id: 123, followed: false },
        { id: 124, followed: false },
        { id: 125, followed: false },
        { id: 126, followed: false },
      ],
      pageSize: 5,
      totalUsersCount: 0,
      currentPage: 1,
      isUsersLoading: false,
      followingInProgress: [],
    };
  });

  it('should follow user by id in usersReducer', () => {
  //1. test data
    const action = followAC(userId);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    const followedUser = newState.users.find((user) => user.id === userId);
    const filteredOldUsers = state.users.filter((user) => user.id !== userId);
    const filteredNewUsers = newState.users.filter((user) => user.id !== userId);
    expect(followedUser.followed).toBe(true);
    expect(filteredNewUsers).toEqual(filteredOldUsers);
  });

  it('should unfollow user by id in usersReducer', () => {
    //1. test data
    const action = unFollowAC(userId);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    const unfollowedUser  = newState.users.find((user) => user.id === userId);
    const filteredOldUsers = state.users.filter((user) => user.id !== userId);
    const filteredNewUsers = newState.users.filter((user) => user.id !== userId);
    expect(unfollowedUser.followed).toBe(false);
    expect(filteredNewUsers).toEqual(filteredOldUsers);
  });

  it('should set current page number in usersReducer', () => {
  //1. test data
    const action = setCurrentPageAC(currentPage);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    expect(newState.currentPage).toBe(currentPage);
  });

  it('should set total users count in usersReducer', () => {
  //1. test data
    const action = setTotalUsersCountAC(totalUsersCount);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    expect(newState.totalUsersCount).toBe(totalUsersCount);
  });

  it('should set users loading status in usersReducer', () => {
  //1. test data
    const action = setIsUsersLoadingAC(isUsersLoading);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    expect(newState.isUsersLoading).toBe(true);
  });

  it('should add userId to followingInProgress array if isFetching is true', () => {
    state.followingInProgress = [999];
    //1. test data
    const action = toggleFollowingProgress(true, userId);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    expect(newState.followingInProgress).toContain(999);
    expect(newState.followingInProgress).toContain(userId);
    expect(newState.followingInProgress.length).toBe(2);
  });

  it('should remove userId from followingInProgress array if isFetching is false', () => {
    state.followingInProgress = [123];
    //1. test data
    const action = toggleFollowingProgress(false, userId);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    expect(newState.followingInProgress).not.toContain(userId);
  });

  it('should set users array in usersReducer', () => {
    //1. test data
    const action = setUsersAC(newUsers);
    //2.action
    const newState = usersReducer(state, action);
    //3.expectation
    expect(newState.users).toEqual(newUsers);
    expect(newState.users).not.toContain(state.users[0]);
  });
});
