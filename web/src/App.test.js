import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

configure({ adapter: new Adapter() });

describe("Test App", () => {
  it('should create a new input', () => {
    const wrapper = mount(
      <App />
    );

    wrapper.find('.btn-secondary').simulate('click');

    expect(wrapper.state('search').length).toEqual(2);
  });

  it('should remove input', () => {
    const wrapper = mount(
      <App />
    );

    wrapper.find('.btn-outline-secondary').simulate('click');

    expect(wrapper.state('search').length).toEqual(0);
  });

  it('should submit form', async () => {
    mock.onGet('http://localhost:8080').reply(200, {
      data: [
        { name: 'nike', domain: 'https://nike.com' }
      ]
    });

    const wrapper = await mount(
      <App />
    );

    wrapper.find('.form-control').simulate('change', { target: { value: 'nike' } });

    await wrapper.instance().handleSubmit({
      preventDefault() { }
    });

    expect(wrapper.state()).toEqual({
      search: ['nike'], results: [
        {
          domain: 'https://nike.com',
          name: 'nike',
        }
      ], error: ''
    });
  });

  it('should submit form..', async () => {
    // TO-DO: Mock not returning 500 error message, need to find another way to mock.
    mock.onGet('http://localhost:8080').reply(500);

    const wrapper = await mount(
      <App />
    );

    wrapper.find('form').simulate('submit');

    expect(wrapper.state()).toEqual({ search: [''], results: [], error: '' });
  });
});