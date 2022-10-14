import { shallowMount } from "@vue/test-utils";
import HeaderLogged from '.';
import {routes} from '../../router';

import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const mockStore = {currentUser: {}}
jest.mock('../../hooks/useStore', () => {
  return () => {
    return mockStore
  }
})

describe('<HeaderLoggeed/>', () => {

  it('should render header logged correctly', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  });

  it('should render 3 dots when theres not user logged', async () => {
    router.push('/')
    await router.isReady()
    mockStore.currentUser.name = 'Igor'
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const buttonLogout = wrapper.find('#logout-button');
    expect(buttonLogout.text()).toBe('Igor (sair)')
  });

  it('should render user name when theres user logged', () => {


  })



})
