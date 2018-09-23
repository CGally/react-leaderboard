import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Leaderboard from '../Leaderboard';
import "../setupTests"

const props = {
  users: [{name: "Tj", score: 1},
          {name: "Chris", score: 69},
          {name: "Dave", score: 17},
          {name: "Ben", score: 11},
          {name: "Caty", score: 21},
          {name: "Miller", score: 33},
          {name: "Zack", score: 88},
          {name: "Sam", score: 42},
          {name: "Nicky", score: 22},
          {name: "Cheyenne", score: 55},
          {name: "Adela", score: 72},
          {name: "Wongo", score: 35},
          {name: "Brett", score: 98},
          {name: "Gina", score: 4},
          {name: "Allen", score: 7},
          {name: "Matt", score: 46},
          {name: "Amanda", score: 31},
          {name: "Jamie", score: 100},
          {name: "Sarah", score: 56},
          {name: "Owen", score: 45}],
  paginate: 3
};

describe('<Leaderboard />', () => {
  let wrapper;
  beforeEach(() => {wrapper = shallow(<Leaderboard users={props.users} paginate={props.paginate} />); });

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render 1 <table />', () => {
    expect(wrapper.find('table').length).toEqual(1);
  });

  it('should render 1 <form />', () => {
      expect(wrapper.find('form').length).toEqual(1);
  });

  it('should render 3 .rank-header', () => {
    expect(wrapper.find('.rank-header').length).toEqual(3);
  });

  it('should render 3 times props.paginate .data', () => {
    expect(wrapper.find('.data').length).toEqual(3 * props.paginate);
  });

  it('pageMax should be set', () => {
    expect(wrapper.state('pageMax')).toBe(Math.ceil(props.users.length / props.paginate));
  });

  it('page should increment', () => {
    expect(wrapper.state('page')).toBe(1);
    wrapper.find('.increment').simulate('click');
    expect(wrapper.state('page')).toBe(2);
  });

  it('page should decrement', () => {
    expect(wrapper.state('page')).toBe(1);
    wrapper.find('.increment').simulate('click');
    expect(wrapper.state('page')).toBe(2);
    wrapper.find('.decrement').simulate('click');
    expect(wrapper.state('page')).toBe(1);
  });

  it('ranking should be ordered', () => {
    expect(wrapper.state('ranking')).toEqual([{"name": "Jamie", "page": 1, "rank": 1, "score": 100}, {"name": "Brett", "page": 1, "rank": 2, "score": 98}, {"name": "Zack", "page": 1, "rank": 3, "score": 88}, {"name": "Adela", "page": 2, "rank": 4, "score": 72}, {"name": "Chris", "page": 2, "rank": 5, "score": 69}, {"name": "Sarah", "page": 2, "rank": 6, "score": 56}, {"name": "Cheyenne", "page": 3, "rank": 7, "score": 55}, {"name": "Matt", "page": 3, "rank": 8, "score": 46}, {"name": "Owen", "page": 3, "rank": 9, "score": 45}, {"name": "Sam", "page": 4, "rank": 10, "score": 42}, {"name": "Wongo", "page": 4, "rank": 11, "score": 35}, {"name": "Miller", "page": 4, "rank": 12, "score": 33}, {"name": "Amanda", "page": 5, "rank": 13, "score": 31}, {"name": "Nicky", "page": 5, "rank": 14, "score": 22}, {"name": "Caty", "page": 5, "rank": 15, "score": 21}, {"name": "Dave", "page": 6, "rank": 16, "score": 17}, {"name": "Ben", "page": 6, "rank": 17, "score": 11}, {"name": "Allen", "page": 6, "rank": 18, "score": 7}, {"name": "Gina", "page": 7, "rank": 19, "score": 4}, {"name": "Tj", "page": 7, "rank": 20, "score": 1}]);
  });

  it('ranking should be able to descend', () => {
    expect(wrapper.state('ranking')).toEqual([{"name": "Jamie", "page": 1, "rank": 1, "score": 100}, {"name": "Brett", "page": 1, "rank": 2, "score": 98}, {"name": "Zack", "page": 1, "rank": 3, "score": 88}, {"name": "Adela", "page": 2, "rank": 4, "score": 72}, {"name": "Chris", "page": 2, "rank": 5, "score": 69}, {"name": "Sarah", "page": 2, "rank": 6, "score": 56}, {"name": "Cheyenne", "page": 3, "rank": 7, "score": 55}, {"name": "Matt", "page": 3, "rank": 8, "score": 46}, {"name": "Owen", "page": 3, "rank": 9, "score": 45}, {"name": "Sam", "page": 4, "rank": 10, "score": 42}, {"name": "Wongo", "page": 4, "rank": 11, "score": 35}, {"name": "Miller", "page": 4, "rank": 12, "score": 33}, {"name": "Amanda", "page": 5, "rank": 13, "score": 31}, {"name": "Nicky", "page": 5, "rank": 14, "score": 22}, {"name": "Caty", "page": 5, "rank": 15, "score": 21}, {"name": "Dave", "page": 6, "rank": 16, "score": 17}, {"name": "Ben", "page": 6, "rank": 17, "score": 11}, {"name": "Allen", "page": 6, "rank": 18, "score": 7}, {"name": "Gina", "page": 7, "rank": 19, "score": 4}, {"name": "Tj", "page": 7, "rank": 20, "score": 1}]);
    wrapper.find('.sortScore').simulate('click');
    expect(wrapper.state('ranking')).toEqual([{"name": "Tj", "page": 1, "rank": 20, "score": 1}, {"name": "Gina", "page": 1, "rank": 19, "score": 4}, {"name": "Allen", "page": 1, "rank": 18, "score": 7}, {"name": "Ben", "page": 2, "rank": 17, "score": 11}, {"name": "Dave", "page": 2, "rank": 16, "score": 17}, {"name": "Caty", "page": 2, "rank": 15, "score": 21}, {"name": "Nicky", "page": 3, "rank": 14, "score": 22}, {"name": "Amanda", "page": 3, "rank": 13, "score": 31}, {"name": "Miller", "page": 3, "rank": 12, "score": 33}, {"name": "Wongo", "page": 4, "rank": 11, "score": 35}, {"name": "Sam", "page": 4, "rank": 10, "score": 42}, {"name": "Owen", "page": 4, "rank": 9, "score": 45}, {"name": "Matt", "page": 5, "rank": 8, "score": 46}, {"name": "Cheyenne", "page": 5, "rank": 7, "score": 55}, {"name": "Sarah", "page": 5, "rank": 6, "score": 56}, {"name": "Chris", "page": 6, "rank": 5, "score": 69}, {"name": "Adela", "page": 6, "rank": 4, "score": 72}, {"name": "Zack", "page": 6, "rank": 3, "score": 88}, {"name": "Brett", "page": 7, "rank": 2, "score": 98}, {"name": "Jamie", "page": 7, "rank": 1, "score": 100}]);
  });

  it('ranking should be able to be sorted alphabetically', () => {
    expect(wrapper.state('ranking')).toEqual([{"name": "Jamie", "page": 1, "rank": 1, "score": 100}, {"name": "Brett", "page": 1, "rank": 2, "score": 98}, {"name": "Zack", "page": 1, "rank": 3, "score": 88}, {"name": "Adela", "page": 2, "rank": 4, "score": 72}, {"name": "Chris", "page": 2, "rank": 5, "score": 69}, {"name": "Sarah", "page": 2, "rank": 6, "score": 56}, {"name": "Cheyenne", "page": 3, "rank": 7, "score": 55}, {"name": "Matt", "page": 3, "rank": 8, "score": 46}, {"name": "Owen", "page": 3, "rank": 9, "score": 45}, {"name": "Sam", "page": 4, "rank": 10, "score": 42}, {"name": "Wongo", "page": 4, "rank": 11, "score": 35}, {"name": "Miller", "page": 4, "rank": 12, "score": 33}, {"name": "Amanda", "page": 5, "rank": 13, "score": 31}, {"name": "Nicky", "page": 5, "rank": 14, "score": 22}, {"name": "Caty", "page": 5, "rank": 15, "score": 21}, {"name": "Dave", "page": 6, "rank": 16, "score": 17}, {"name": "Ben", "page": 6, "rank": 17, "score": 11}, {"name": "Allen", "page": 6, "rank": 18, "score": 7}, {"name": "Gina", "page": 7, "rank": 19, "score": 4}, {"name": "Tj", "page": 7, "rank": 20, "score": 1}]);
    wrapper.find('.sortAlpha').simulate('click');
    expect(wrapper.state('ranking')).toEqual([{"name": "Adela", "page": 1, "rank": 4, "score": 72}, {"name": "Allen", "page": 1, "rank": 18, "score": 7}, {"name": "Amanda", "page": 1, "rank": 13, "score": 31}, {"name": "Ben", "page": 2, "rank": 17, "score": 11}, {"name": "Brett", "page": 2, "rank": 2, "score": 98}, {"name": "Caty", "page": 2, "rank": 15, "score": 21}, {"name": "Cheyenne", "page": 3, "rank": 7, "score": 55}, {"name": "Chris", "page": 3, "rank": 5, "score": 69}, {"name": "Dave", "page": 3, "rank": 16, "score": 17}, {"name": "Gina", "page": 4, "rank": 19, "score": 4}, {"name": "Jamie", "page": 4, "rank": 1, "score": 100}, {"name": "Matt", "page": 4, "rank": 8, "score": 46}, {"name": "Miller", "page": 5, "rank": 12, "score": 33}, {"name": "Nicky", "page": 5, "rank": 14, "score": 22}, {"name": "Owen", "page": 5, "rank": 9, "score": 45}, {"name": "Sam", "page": 6, "rank": 10, "score": 42}, {"name": "Sarah", "page": 6, "rank": 6, "score": 56}, {"name": "Tj", "page": 6, "rank": 20, "score": 1}, {"name": "Wongo", "page": 7, "rank": 11, "score": 35}, {"name": "Zack", "page": 7, "rank": 3, "score": 88}]);
  });
});
