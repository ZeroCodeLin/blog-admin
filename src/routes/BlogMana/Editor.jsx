import React, { Component } from 'react';
var ClassicEditor = require( '@ckeditor/ckeditor5-build-classic' )
import Simditor from 'simditor';
import $ from 'jquery';
import '../../../node_modules/simditor/styles/simditor.css';

let editor;
class Editor extends Component {
    
    state={
        value:''
    }
    componentWillReceiveProps(nextProps) {
        
    }
    componentDidMount(){
        editor = new Simditor({
            textarea: $('#editor')
            //optional options
          });
        
        editor.on("valuechanged",(e,src)=>{
            // console.log(editor.getValue())
            this.props.onChange(editor.getValue())
        })


    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
          onChange(Object.assign({}, this.state, changedValue));
        }
    }
    handleChange = (e,src) => {
        console.log(editor.getValue())
        console.log(src,'src')
    }
    render() {
        
       
        return (
            <textarea name="content" id="editor" ></textarea>
        )
    }
}

export default Editor;