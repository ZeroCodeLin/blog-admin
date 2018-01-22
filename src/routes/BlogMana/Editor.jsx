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
        // Should be a controlled component.
        if ('value' in nextProps) {
          const value = nextProps.value;
          editor.setValue(value?value:"")
        }
    }
    componentDidMount(){
        // ClassicEditor
        // .create( document.querySelector( '#editor' ),{
        //     toolbar: [ 'headings', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote','code' ],
        // } )
        // .then( editor => {
        //     console.log( editor );
        // } )
        // .catch( error => {
        //     console.error( error );
        // } );
        editor = new Simditor({
            textarea: $('#editor')
            //optional options
          });
        
        console.log(this.props,'2')


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