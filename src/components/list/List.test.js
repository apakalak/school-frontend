import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import chai from 'chai'
import sinon from 'sinon';

import List from './List';

describe('List' , () => {
     it('should render without error', () => {
        const wrapper = shallow(<List />);
        expect(wrapper).to.be.ok;
    })

    it('should find component using its class name', () => {
        const wrapper = shallow(<List />);
        expect(wrapper.find(".list").length).to.equal(1);
    })

    it('should get the header from component', () => {
        const wrapper = shallow(<List header="Students"/>);
        expect(wrapper.find('h1').text()).to.equal('Students');
    })

    it('should render out 2 boxes', () => {
        const students = [
            {id:3 ,text:"dikshitha" ,css:"selected"},
            {id:4 ,text:"anusha" , css:"empty"}
        ]
        const wrapper = mount(<List header="Students" items ={students} />);
        expect(wrapper.find('.items').children().length).to.equal(2);
    })

    it('should render out 2 boxes with given props', () => {
        const students = [
            {id:3 , text:"dikshitha" , css:"selected"},
            {id:4 , text:"anusha" , css:"empty"}
        ]
        const wrapper = mount(<List header="Students" items ={students} />);
        const items = wrapper.find('.items').children()

        const item1 = items.get(0);
        const item2 = items.get(1);
        
        console.log(item1.props, item2.props)
        expect(item1.props["id"]).to.equal(3);
        expect(item2.props["id"]).to.equal(4);
        expect(item1.props["css"]).to.equal("selected");
        expect(item2.props["css"]).to.equal("empty");
        expect(item1.props["text"]).to.equal("dikshitha");
        expect(item2.props["text"]).to.equal("anusha");
    })

    // it('should get the css class from component', () => {
    //     const wrapper = shallow(<Box css="selected"/>);
    //     const html = wrapper.find('.box').children().get(0).props["className"]
    //     expect(html).to.equal("selected");
    // })

    // it('should get the id  from component', () => {
    //     const wrapper = shallow(<Box id="3"/>);
    //     const html = wrapper.find('.box').children().get(0).props["data-id"]
    //     expect(html).to.equal("3");
    // })

    // it('should render out full component', () => {
    //     const wrapper = shallow(<Box css="empty" text="bob@gmail.com" id ="3"/>);
    //     const object = wrapper.find('.box').children().get(0);
    //     //console.log(object)
    //     const id = object.props["data-id"]
    //     expect(id).to.equal("3");
    //     const text = object.props["children"]
    //     expect(text).to.equal('bob@gmail.com');
    //     const css = object.props["className"]
    //     expect(css).to.equal("empty");
    // })

    // it('handle click on box', () => {
    //     var func = sinon.stub()
    //     const wrapper = shallow(<Box css="empty" text="bob@gmail.com" id ="3" click={func}/>);
    //     wrapper.find('.empty').simulate('click')
    //     expect(func.callCount).to.equal(1);
    // })
});