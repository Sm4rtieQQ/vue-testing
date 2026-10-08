import { shallowMount } from '@vue/test-utils';
import LoginStatus from '@/components/LoginStatus.vue'

const mountWrapper = (status?) => {
    return shallowMount(LoginStatus, {props: {status}});
}

const expectClass = (wrapper, className: string, exists: boolean) => {
    return expect(wrapper.find('.' + className).exists()).toBe(exists);
}

describe('LoginStatus', () => {
    it('should show welcome badge when status is loggedIn', () => {
        // Arrange
        const status = 'loggedIn';

        // Act
        const wrapper = mountWrapper(status);

        // Assert
        expectClass(wrapper, 'welcome', true);
        expectClass(wrapper, 'logged-out', false);
        expectClass(wrapper, 'loading', false);
    });
    
    it('should show loggedOut badge when status is loggedOut', () => {
        // Arrange
        const status = 'loggedOut';

        // Act
        const wrapper = mountWrapper(status);

        // Assert
        expectClass(wrapper, 'welcome', false)
        expectClass(wrapper, 'logged-out', true)
        expectClass(wrapper, 'loading', false);
    });

    it('should show loading badge when status is loading', () => {
        // Arrange
        const status = 'loading';

        // Act
        const wrapper = mountWrapper(status);

        // Assert
        expectClass(wrapper, 'welcome', false);
        expectClass(wrapper, 'logged-out', false);
        expectClass(wrapper, 'loading', true);
    });

    it('should show loading badge when status is invalid', () => {
        // Arrange
        const status = 'something-invalid';

        // Act
        const wrapper = mountWrapper(status);

        // Assert
        expectClass(wrapper, 'welcome', false);
        expectClass(wrapper, 'logged-out', false);
        expectClass(wrapper, 'loading', true);
    });
})