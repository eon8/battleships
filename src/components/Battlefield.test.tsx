import * as enzyme from 'enzyme';
import * as React from 'react';

import Battlefield from './Battlefield';

it('renders the correct text when no enthusiasm level is given', () => {
  const hello = enzyme.shallow(<Battlefield playerField={[[]]} />);
  expect(hello.find(".greeting").text()).toEqual('Hello Daniel!')
});

it('renders the correct text with an explicit enthusiasm of 1', () => {
  const hello = enzyme.shallow(<Battlefield playerField={[[]]} />);
  expect(hello.find(".greeting").text()).toEqual('Hello Daniel!')
});

it('renders the correct text with an explicit enthusiasm level of 5', () => {
  const hello = enzyme.shallow(<Battlefield playerField={[[]]} />);
  expect(hello.find(".greeting").text()).toEqual('Hello Daniel!!!!!');
});

it('throws when the enthusiasm level is 0', () => {
  expect(() => {
    enzyme.shallow(<Battlefield playerField={[[]]} />);
  }).toThrow();
});

it('throws when the enthusiasm level is negative', () => {
  expect(() => {
    enzyme.shallow(<Battlefield playerField={[[]]} />);
  }).toThrow();
});