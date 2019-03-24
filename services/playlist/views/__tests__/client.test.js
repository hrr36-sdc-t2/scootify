import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlayList from '../PlayList.js';

import Info from '../components/Info';
import List from '../components/List';

import { usePlaylistState } from '../components/Context';

Enzyme.configure({ adapter: new Adapter() });

describe('components should load properly', () => {
  let wrapped;
  beforeEach(() => {
    wrapped = shallow(<PlayList />);
  });
  it('should have an Info', () => {
    expect(wrapped.find(Info).length).toEqual(1);
  });
  it('should have an List', () => {
    expect(wrapped.find(List).length).toEqual(1);
  });
});

describe('Play List State Hooks', () => {
  let wrapped;
  beforeAll(() => {
    const Container = () => {
      let [ state, setStateValue ] = usePlaylistState();
      let handleToggle = () => {
        setStateValue(!state);
      };
      console.log(state);
      return (
        <div>
          <button onClick={handleToggle}>{state}</button>
          <span className={`state-${state}`}>{state}</span>
        </div>
      );
    };
    wrapped = mount(<Container />);
  });
  it('should state if active or not', () => {
    let btn = wrapped.find('button');
    expect(wrapped.find('.state-false').length).toEqual(1);
    btn.simulate('click');
    expect(wrapped.find('.state-false').length).toEqual(0);
    expect(wrapped.find('.state-true').length).toEqual(1);
  });
  afterAll(() => {
    wrapped.unmount();
  });
});


