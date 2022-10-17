import { shallowMount } from "@vue/test-utils";
import router from '../../router';

import HeaderLogged from '.';

const mockStore = {currentUser: {}}
jest.mock('../../hooks/useStore', () => {
  return () => {
    return mockStore
  }
})

const wrapper = shallowMount(HeaderLogged, {
  global: {
    plugins: [router]
  }
})

describe('<HeaderLoggeed/>', () => {

  it('should render header logged correctly', async () => {
    await router.isReady()
    router.push('/')

    expect(wrapper.html()).toMatchSnapshot()
  });

  it('should render 3 dots when theres not user logged', async () => {
    mockStore.currentUser.name = 'Igor'
    await router.isReady()
    router.push('/')

    const buttonLogout = wrapper.find('#logout-button');
    expect(buttonLogout.text()).toBe('Igor (sair)')
  });

  it('should render user name when theres user logged', () => {


  })



})
