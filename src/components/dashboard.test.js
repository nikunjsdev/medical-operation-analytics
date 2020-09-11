import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './dashboard';

const setup = () => {
    const component = shallow(<Dashboard />)
    return {
        component
    }
}

describe('Dashboard Component', () => {
    it('should render Dashboard component', () => {
        const { component } = setup();
        expect(component).toMatchSnapshot();
    });
})
