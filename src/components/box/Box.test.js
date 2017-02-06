import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import chai from 'chai'
import sinon from 'sinon';

import Box from './Box';

describe('Box' , () => {
     it('should render without error', () => {
        const wrapper = shallow(<Box />);
        expect(wrapper).to.be.ok;
    })

    it('should find component using its class name', () => {
        const wrapper = shallow(<Box />);
        expect(wrapper.length).to.equal(1);
    })

    it('should get text from component', () => {
        const wrapper = shallow(<Box text="alice@gmail.com"/>);
        expect(wrapper.text()).to.equal('alice@gmail.com');
    })

    it('should get the css class from component', () => {
        const wrapper = shallow(<Box css="selected"/>);
        const html = wrapper.get(0).props["className"]
        expect(html).to.equal("selected");
    })

    it('should get the id  from component', () => {
        const wrapper = shallow(<Box id="3"/>);
        const html = wrapper.get(0).props["data-id"]
        expect(html).to.equal("3");
    })

    it('should render out full component', () => {
        const wrapper = shallow(<Box css="empty" text="bob@gmail.com" id ="3"/>);
        const object = wrapper.get(0);
        const id = object.props["data-id"]
        expect(id).to.equal("3");
        const text = object.props["children"]
        expect(text).to.equal('bob@gmail.com');
        const css = object.props["className"]
        expect(css).to.equal("empty");
    })

    it('handle click on box', () => {
        var func = sinon.stub()
        const wrapper = shallow(<Box css="empty" text="bob@gmail.com" id ="3" click={func}/>);
        wrapper.find('.empty').simulate('click')
        expect(func.callCount).to.equal(1);
    })
});