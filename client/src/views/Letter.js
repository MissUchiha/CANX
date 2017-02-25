import React from 'react'
import Footer from './Footer'
import Modal from 'react-modal'
import {modalStyle} from '../style/modalStyle.js'
import DrawApi from '../api/DrawApi'
import ErrorModal from './ErrorModal'

class Letter extends React.Component {
	constructor(...args) {
		super(...args)

		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.clearCanvas = this.clearCanvas.bind(this)
		this.saveCanvas = this.saveCanvas.bind(this)
		this.handleOnMouseUp = this.handleOnMouseUp.bind(this)
		this.handleOnMouseDown = this.handleOnMouseDown.bind(this)
		this.handleOnMouseMove = this.handleOnMouseMove.bind(this)
		this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this)
		this.handleOnTouchStart = this.handleOnTouchStart.bind(this)
		this.handleOnTouchMove = this.handleOnTouchMove.bind(this)
		this.onUp = this.onUp.bind(this)
		this.onDown = this.onDown.bind(this)
		this.onMove = this.onMove.bind(this)
		this.minXFromStrokes = this.minXFromStrokes.bind(this)
		this.minYFromStrokes = this.minYFromStrokes.bind(this)
		this.init = this.init.bind(this)
		this.initState = this.initState.bind(this)
		this.initCanvasConf = this.initCanvasConf.bind(this)
		this.initVar = this.initVar.bind(this)

		this.init()
	}

	init() {
		this.initState()
		this.initCanvasConf()
		this.initVar()
	}

	initState() {
		this.state = {
			openDeleteModal: false,
			openSaveModal: false,
			openErrorModal: false,
			errorTitle: "",
			strokes: []
		}
	}

	initCanvasConf() {
		this.ctx = null
		this.canvas = null
		this.rect = null
	}

	initVar() {
		this.points = []
		this.lastPoint = null
		this.startTime = null
	}

	openModal(opened) {
		return () => this.setState({[opened] : true})
	}

	closeModal() {
		this.setState({openDeleteModal: false, openSaveModal: false, openErrorModal: false})
	}

	componentWillMount() {
		document.getElementsByTagName('body')[0].style.overflow = 'hidden'
	}

	componentWillUnmount() {
		document.getElementsByTagName('body')[0].style.overflow = 'scroll'
		document.removeEventListener('onmouseup', this.handleOnMouseUp, false)
	}

	componentDidMount() {
		document.addEventListener('onmouseup', this.handleOnMouseUp, false)
		this.canvas = document.getElementById('canvas')
		this.rect = this.canvas.getBoundingClientRect()
		this.ctx = this.canvas.getContext('2d')
		const style = window.getComputedStyle(this.canvas)
		this.ctx.canvas.width = parseInt(style.getPropertyValue('width'), 10)
		this.ctx.canvas.height = parseInt(style.getPropertyValue('height'), 10)
		this.ctx.lineWidth = 10
		// this.ctx.shadowBlur = 1;
		// this.ctx.shadowColor = "#cccccc";
		this.ctx.lineJoin = 'round'
		this.ctx.lineCap = 'round'
		this.ctx.strokeStyle = '#cccccc'
	}

	midPoint(p1, p2) {
  		return {
    		x: p1.x + (p2.x - p1.x) / 2,
    		y: p1.y + (p2.y - p1.y) / 2
 		 }
	}

	currentPoint(x, y) {
			return {
				x: Math.round((x-this.rect.left)/(this.rect.right-this.rect.left)*this.canvas.width),
				y: Math.round((y-this.rect.top)/(this.rect.bottom-this.rect.top)*this.canvas.height),
				time: (new Date()).getTime()
			}
	}

	onDown(x,y) {
		const current = this.currentPoint(x, y)
		this.points.push(current)
		this.lastPoint = current
		this.isDrawing = true
		this.startTime = (new Date()).getTime()
		this.ctx.beginPath()
		this.ctx.arc(current.x, current.y, 1, 0, 2 * Math.PI, true)
		this.ctx.stroke()
		this.ctx.beginPath()
		this.ctx.moveTo(current.x, current.y)
	}

	onUp() {
		const newStrokes = {
			points: this.points,
			startTime: this.startTime,
			endTime: (new Date()).getTime()
		}
		this.isDrawing = false
		this.points = []
		this.lastPoint = null
		this.setState({
				strokes: [ ...this.state.strokes, newStrokes]
			})
	}

	onMove(x, y) {
		const current = this.currentPoint(x, y)

		const midPoint = this.midPoint(this.lastPoint, current)
		this.ctx.quadraticCurveTo(this.lastPoint.x, this.lastPoint.y, midPoint.x, midPoint.y)
		this.ctx.stroke()

		this.points.push(current)
		this.lastPoint = current
	}

	handleOnMouseDown(e) {
		this.onDown(e.clientX, e.clientY)
	}

	handleOnMouseMove(e) {
  	if (!this.isDrawing) return
		this.onMove(e.clientX, e.clientY)
	}

	handleOnMouseUp() {
		this.onUp()
	}

	handleOnTouchStart(e) {
		if(e.touches)
        if(e.touches.length === 1)
            this.onDown(e.touches[0].pageX,e.touches[0].pageY)
  }

	handleOnTouchMove(e) {
  	if(!this.isDrawing) return
		if(e.touches)
				if(e.touches.length === 1)
            this.onMove(e.touches[0].pageX,e.touches[0].pageY)
	}

	handleOnTouchEnd() {
		this.onUp()
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.initState()
		this.initVar()
		this.closeModal()
	}

	minXPoint(points) {
		return points.reduce((prevPoint, currPoint) => {
			 return (prevPoint.x < currPoint.x) ? prevPoint : currPoint
	 }, points[0])
	}

	minYPoint(points) {
		return points.reduce((prevPoint, currPoint) => {
			 return (prevPoint.y < currPoint.y) ? prevPoint : currPoint
	 }, points[0])
	}

	minXFromStrokes(strokes) {
		const minXStroke= strokes.reduce((prevStroke, currStroke) => {
			 const minPrevPointX = this.minXPoint(prevStroke.points)
			 const minCurrPointX = this.minXPoint(currStroke.points)

			return { points : [
											(minPrevPointX.x < minCurrPointX.x) ? minPrevPointX : minCurrPointX
			]}
		}, strokes[0])
		return minXStroke.points[0].x
	}

	minYFromStrokes(strokes) {
		const minYStroke= strokes.reduce((prevStroke, currStroke) => {
			 const minPrevPointY = this.minYPoint(prevStroke.points)
			 const minCurrPointY = this.minYPoint(currStroke.points)

			return { points : [
									(minPrevPointY.y < minCurrPointY.y) ? minPrevPointY : minCurrPointY
			]}
		}, strokes[0])
		return minYStroke.points[0].y
	}

// TODO: refactor and sub first stroke start time from time in each point
	transformStrokes() {
		const maxY = this.canvas.width

		const rotatedStrokes = this.state.strokes.map((stroke) => {
				const transformedPoints = stroke.points.map((point) => {
						return Object.assign(point, { y: maxY - point.y})
				})
				return Object.assign(stroke, {points: transformedPoints})
		})

		const minX = this.minXFromStrokes(rotatedStrokes)
		const minY = this.minYFromStrokes(rotatedStrokes)

		return this.state.strokes.map((stroke) => {
				const transformedPoints = stroke.points.map((point) => {
						return Object.assign(point, {x: point.x-minX, y: point.y - minY})
				})
				return Object.assign(stroke, {points: transformedPoints})
		})
	}

	saveCanvas() {
		const transformedStrokes = this.transformStrokes()
		const capitalizedCategory = this.props.args.title.charAt(0).toUpperCase() + this.props.args.title.slice(1)
		DrawApi.postDraw({letter: this.props.args.letter,
											category: capitalizedCategory,
											content: JSON.stringify(transformedStrokes),
											uid: this.props.args.id
										}).catch(err => this.openModal('openErrorModal'))

		this.clearCanvas()
		this.closeModal()
	}

	render() {
		const argsFoot = {left: "/categories/"+this.props.args.title+"/letters/"+this.props.args.before,
						  				right: "/categories/"+this.props.args.title+"/letters/"+this.props.args.after,
											onClick: this.clearCanvas}
		return (
		<div className='letter-page'>
				<h1 className='letter-h1'>
					 {this.props.args.letter}
				</h1>
				<canvas id='canvas'
						className='letter-canvas'
						onMouseDown={this.handleOnMouseDown}
						onMouseUp={this.handleOnMouseUp}
						onMouseMove={this.handleOnMouseMove}
						onTouchStart={this.handleOnTouchStart}
						onTouchEnd={this.handleOnTouchEnd}
						onTouchMove={this.handleOnTouchMove}
						></canvas>
    			<div className='letter-btn-left' onClick={this.openModal("openDeleteModal")} > </div>
				<div className='letter-btn-right' onClick={this.openModal("openSaveModal")} > </div>
				<Modal isOpen={this.state.openDeleteModal}
						   onRequestClose={this.closeModal}
						   contentLabel="Delete"
						   shouldCloseOnOverlayClick={true}
						   style={modalStyle}
					>

					<h2> Are you sure? </h2>

					<button className='modal-yes modal-trash' type='button' onTouchStart={this.clearCanvas} onClick={this.clearCanvas}> </button>

					<button className='modal-no modal-close' type='button' value='No' onTouchStart={this.closeModal} onClick={this.closeModal}> </button>

				</Modal>

				<Modal isOpen={this.state.openSaveModal}
							 onRequestClose={this.closeModal}
							 contentLabel="Save"
							 shouldCloseOnOverlayClick={true}
							 style={modalStyle}
					>

					<h2> Are you sure? </h2>

					<button className='modal-yes modal-check' type='button' onTouchStart={this.saveCanvas} onClick={this.saveCanvas}> </button>

					<button className='modal-no modal-close' type='button' value='No' onTouchStart={this.closeModal} onClick={this.closeModal}> </button>

				</Modal>
				<ErrorModal  args={{title: this.state.errorTitle,
					closeModal: this.closeModal,
					isOpen: this.state.openErrorModal}} />

				<div className='footer-back'></div>
				<Footer args={argsFoot}/>

			</div>
		)
	}
}

export default Letter
