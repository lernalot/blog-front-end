import React, { Component } from 'react';
// import { withRouter, Switch, Route } from 'react-router-dom'
import marked from 'marked'
import hljs from 'highlight.js';
import "./index.less";
import "./js-highlight.css";
import "./common.css";
import binaryTree from "./binaryTree";
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

hljs.configure({
	tabReplace: '  ',
	classPrefix: 'hljs-',
	languages: ['CSS', 'HTML, XML', 'JavaScript', 'PHP', 'Python', 'Stylus', 'TypeScript', 'Markdown']
});
marked.setOptions({
	highlight (code) {
		return hljs.highlightAuto(code).value
	}
});
const text = binaryTree;

export default class BlogContainer extends Component {
	constructor(){
		super();
		this.state = {
			aceBoxH: null,
			previewContent: '',
			collapsed: false
		}
		this.cacheValue()
		this.containerScroll = this.containerScroll.bind(this)
		this.onContentChange = this.onContentChange.bind(this)
	}

	componentDidMount() {
		this.setState({
			aceBoxH: document.documentElement.clientHeight - document.querySelector('.edit-header').offsetHeight + 'px'
		})
		this.setState({
			previewContent: marked(text)
		})
	}
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}

	cacheValue() {
		this.currentTabIndex = 1
		this.hasContentChanged = false
		this.scale = 1
	}

	setCurrentIndex(index) {
		this.currentTabIndex = index
	}

	containerScroll(e) {
		this.hasContentChanged && this.setScrollValue()
		if (this.currentTabIndex === 1) {
			this.previewContainer.scrollTop = this.editContainer.scrollTop * this.scale
		} else {
			this.editContainer.scrollTop = this.previewContainer.scrollTop / this.scale
		}
	}

	onContentChange(e) {
		this.setState({
			previewContent: marked(text)
		})
		!this.hasContentChanged && (this.hasContentChanged = true)
	}

	setScrollValue() {
		// 设置值，方便 scrollBy 操作
		this.scale = (this.previewWrap.offsetHeight - this.previewContainer.offsetHeight) / (this.editWrap.offsetHeight - this.editContainer.offsetHeight)
		this.hasContentChanged = false
	}

	render(){
		let state = this.state
		return(
			<React.Fragment>
				<Layout>
					<Sider
						trigger={null}
						collapsible
						collapsed={this.state.collapsed}
					>
						<div className="logo" />
						<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
							<Menu.Item key="1">
								<Icon type="user" />
								<span>nav 1</span>
							</Menu.Item>
							<Menu.Item key="2">
								<Icon type="video-camera" />
								<span>nav 2</span>
							</Menu.Item>
							<Menu.Item key="3">
								<Icon type="upload" />
								<span>nav 3</span>
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout>
						<Header style={{ background: '#fff', padding: 0 }}>
							<Icon
								className="trigger"
								type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={this.toggle}
							/>
						</Header>
						<Content style={{
							margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
						}}
						>
							<header className="edit-header" key='header'>
								<input type="text" className="title-input" placeholder="输入文章标题..." spellCheck="false"/>
							</header>
							<div className="editor-main-a" ref={node=>this.aceBox = node} style={{height: state.aceBoxH}} key='main'>
								{/*<div className="common-container editor-container" onMouseOver={this.setCurrentIndex.bind(this, 1)} onScroll={this.containerScroll} ref={node=>this.editContainer=node}>*/}
									{/*<div contentEditable="plaintext-only" name="editor-wrapper" id="editor-wrapper" className="common-wrapper editor-wrapper" onInput={this.onContentChange} ref={node=>this.editWrap=node}></div>*/}
								{/*</div>*/}
								<div className="common-container preview-container" ref={node=>this.previewContainer=node} onMouseOver={this.setCurrentIndex.bind(this, 2)} onScroll={this.containerScroll}>
									<div className="markdown-body common-wrapper preview-wrapper" ref={node=>this.previewWrap=node} dangerouslySetInnerHTML={{__html: state.previewContent}}></div>
								</div>
							</div>
						</Content>
					</Layout>
				</Layout>
			</React.Fragment>
		)
	}
}