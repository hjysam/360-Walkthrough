/******/ (function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/ var installedModules = {}; // The require function
	/******/
	/******/ /******/ function __webpack_require__(moduleId) {
		/******/
		/******/ // Check if module is in cache
		/******/ if (installedModules[moduleId]) {
			/******/ return installedModules[moduleId].exports;
			/******/
		} // Create a new module (and put it into the cache)
		/******/ /******/ var module = (installedModules[moduleId] = {
			/******/ i: moduleId,
			/******/ l: false,
			/******/ exports: {},
			/******/
		}); // Execute the module function
		/******/
		/******/ /******/ modules[moduleId].call(
			module.exports,
			module,
			module.exports,
			__webpack_require__
		); // Flag the module as loaded
		/******/
		/******/ /******/ module.l = true; // Return the exports of the module
		/******/
		/******/ /******/ return module.exports;
		/******/
	} // expose the modules object (__webpack_modules__)
	/******/
	/******/
	/******/ /******/ __webpack_require__.m = modules; // expose the module cache
	/******/
	/******/ /******/ __webpack_require__.c = installedModules; // identity function for calling harmony imports with the correct context
	/******/
	/******/ /******/ __webpack_require__.i = function (value) {
		return value;
	}; // define getter function for harmony exports
	/******/
	/******/ /******/ __webpack_require__.d = function (exports, name, getter) {
		/******/ if (!__webpack_require__.o(exports, name)) {
			/******/ Object.defineProperty(exports, name, {
				/******/ configurable: false,
				/******/ enumerable: true,
				/******/ get: getter,
				/******/
			});
			/******/
		}
		/******/
	}; // getDefaultExport function for compatibility with non-harmony modules
	/******/
	/******/ /******/ __webpack_require__.n = function (module) {
		/******/ var getter =
			module && module.__esModule
				? /******/ function getDefault() {
						return module['default'];
				  }
				: /******/ function getModuleExports() {
						return module;
				  };
		/******/ __webpack_require__.d(getter, 'a', getter);
		/******/ return getter;
		/******/
	}; // Object.prototype.hasOwnProperty.call
	/******/
	/******/ /******/ __webpack_require__.o = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	}; // __webpack_public_path__
	/******/
	/******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
	/******/
	/******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
	/******/
})(
	/************************************************************************/
	/******/ [
		/* 0 */
		/***/ function (module, exports, __webpack_require__) {
			'use strict';

			/**
			 * @file index.js
			 * Contains code that registers a dialog popup component.
			 */

			/* global AFRAME */
			if (typeof AFRAME === 'undefined') {
				throw new Error(
					'Component attempted to register before AFRAME was available.'
				);
			}
			/**
			 * Dialog Popup component for A-Frame.
			 */

			AFRAME.registerComponent('dialog-question', {
				schema: {
					question: {
						type: 'string',
						default: 'Enter Question',
					},
					questionColor: {
						type: 'string',
						default: 'black',
					},
					questionFont: {
						type: 'string',
						default: 'assets/ralewaybold.json',
					},
					questionWrapCount: {
						type: 'number',
						default: 30,
					},
					answer: {
						type: 'string',
						default: 'Enter Answers',
					},
					answerColor: {
						type: 'string',
						default: 'black',
					},
					answerFont: {
						type: 'string',
						default: 'assets/raleway.json',
					},
					answerWrapCount: {
						type: 'number',
						default: 30,
					},
					openOn: {
						type: 'string',
						default: 'mousedown',
					},
					active: {
						type: 'boolean',
						default: true,
					},
					openIconImage: {
						type: 'asset',
						default: 'assets/mcq1.png',
					},
					openIconRadius: {
						type: 'number',
						default: 0.3,
					},
					openIconColor: {
						type: 'string',
						default: 'white',
					},
					closeIconImage: {
						type: 'asset',
						default: 'assets/close.jpg',
					},
					closeIconRadius: {
						type: 'number',
						default: 0.3,
					},
					closeIconColor: {
						type: 'string',
						default: 'white',
					},
					dialogBoxWidth: {
						type: 'number',
						default: 4,
					},
					dialogBoxHeight: {
						type: 'number',
						default: 2.5,
					},
					dialogBoxColor: {
						type: 'string',
						default: 'white',
					},
					dialogBoxPadding: {
						type: 'number',
						default: 0.2,
					},
				},
				multiple: true,
				dialogPlaneEl: null,
				openIconEl: null,
				closeIconEl: null,
				titleEl: null,
				bodyEl: null,

				/**
				 * Spawns the entities required to support this dialog.
				 */
				init: function init() {
					this.cameraEl = document.querySelector('[camera]');
					this.spawnEntities();
					this.el.emit('loaded');
				},

				/**
				 * If the component is open, ensure it always faces the camera.
				 */
				tick: function tick() {
					if (this.isOpen) {
						this.positionDialogPlane();
					}
				},

				/**
				 * When this component is removed, destruct event listeners.
				 */
				remove: function remove() {
					var openOn = this.data.openOn;
					this.openIconEl.removeEventListener(
						openOn,
						this.toggleDialogOpen.bind(this)
					);
					this.closeIconEl.removeEventListener(
						openOn,
						this.toggleDialogOpen.bind(this)
					);
				},

				/**
				 * When this component is updated, re-calculate title, body, image, and
				 * dialog plane to incorporate changes.
				 */
				/*update: function update() {
					this.generateTitle();
					this.generateBody();
				},*/

				/**
				 * Handles opening and closing the dialog plane.
				 */

				/**
				 * Generates the open icon.
				 */
				generateOpenIcon: function generateOpenIcon() {
					var _this$data = this.data,
						radius = _this$data.openIconRadius,
						color = _this$data.openIconColor,
						src = _this$data.openIconImage,
						openOn = _this$data.openOn;
					var idname = this.el.getAttribute('id');

					var openIcon = document.createElement('a-entity');
					openIcon.setAttribute(
						'id',
						''.concat(this.el.getAttribute('id'), '--open-icon')
					);
					//openIcon.classList.add('removeIcon');

					openIcon.setAttribute(
						'position',
						Object.assign({}, this.el.getAttribute('position'))
					);
					openIcon.setAttribute('geometry', {
						primitive: 'circle',
						radius: radius,
					});
					openIcon.setAttribute('material', {
						color: color,
						src: src,
						shader: 'flat',
					});
					// If the parent entity has aa look-at component attached, apply the look-at
					// component to the openIcon.
					openIcon.classList.add('openChecker');
					openIcon.setAttribute('look-at', '#cam');
					$(window).on('load', function () {
						openIcon.addEventListener('mouseenter', function () {
							// var removeIcon = $('.removeIcon');
							// for (let x = 0; x < removeIcon.length; x++) {
							// 	removeIcon[x].setAttribute('visible', 'false');
							// }
							document
								.getElementById(''.concat(idname, '--open-icon'))
								.setAttribute('visible', 'false');
							document
								.getElementById(''.concat(idname, '--dialog-plane'))
								.setAttribute(
									'animation__scale',
									'property: scale; to: 1 1 1; dur:200'
								);
							document
								.getElementById(''.concat(idname, '--dialog-plane'))
								.setAttribute('visible', 'true');
							var openChecker = $('.openChecker');
							var planeChecker = $('.planeChecker');
							if (!AFRAME.utils.device.isMobile()) {
								for (let x = 0; x < openChecker.length; x++) {
									if (
										openChecker[x].getAttribute('id') !=
										idname.concat('--open-icon')
									) {
										openChecker[x].setAttribute('visible', 'true');
										planeChecker[x].setAttribute('visible', 'false');
									}
								}
							}
						});
					});

					this.openIconEl = openIcon;
					return openIcon;
				},

				/**
				 * Generates the close icon.
				 */
				generateCloseIcon: function generateCloseIcon() {
					var _this$data2 = this.data,
						radius = _this$data2.closeIconRadius,
						color = _this$data2.closeIconColor,
						src = _this$data2.closeIconImage,
						width = _this$data2.dialogBoxWidth,
						height = _this$data2.dialogBoxHeight,
						openOn = _this$data2.openOn;
					var closeIcon = document.createElement('a-entity');
					closeIcon.setAttribute(
						'id',
						''.concat(this.el.getAttribute('id'), '--close-icon')
					);
					closeIcon.setAttribute('position', {
						x: width / 2,
						y: height / 2,
						z: 0.01,
					});
					closeIcon.setAttribute('geometry', {
						primitive: 'circle',
						radius: radius,
					});
					closeIcon.setAttribute('material', {
						color: color,
						src: src,
					});
					closeIcon.addEventListener(openOn, this.toggleDialogOpen.bind(this));
					this.closeIconEl = closeIcon;
					return closeIcon;
				},

				/**
				 * Generates the title text.
				 */
				generateTitle: function generateTitle() {
					var _this$data3 = this.data,
						value = _this$data3.question,
						color = _this$data3.questionColor,
						font = _this$data3.questionFont,
						wrapCount = _this$data3.questionWrapCount,
						width = _this$data3.dialogBoxWidth,
						height = _this$data3.dialogBoxHeight,
						padding = _this$data3.dialogBoxPadding;
					var title = this.titleEl || document.createElement('a-entity');
					title.setAttribute(
						'id',
						''.concat(this.el.getAttribute('id'), '--title')
					);
					title.setAttribute('text', {
						value: value,
						color: color,
						font: font,
						wrapCount: wrapCount,
						width: width - padding * 2,
						baseline: 'center',
						anchor: 'center',
						shader: 'msdf',
					});
					var y = height / 2 - padding;
					title.setAttribute('position', {
						x: 0,
						y: 0.75,
						z: 0.01,
					});
					this.titleEl = title;
					return title;
				},

				/**
				 * Generates the body text entity.
				 */
				generateBody: function generateBody() {
					var _this$data4 = this.data,
						value = _this$data4.answer,
						color = _this$data4.answerColor,
						font = _this$data4.answerFont,
						wrapCount = _this$data4.answerWrapCount,
						width = _this$data4.dialogBoxWidth,
						height = _this$data4.dialogBoxHeight,
						padding = _this$data4.dialogBoxPadding,
						radius = _this$data4.openIconRadius,
						multiple = _this$data4.multiple;
					this.bodyEl = '';
					let ansHint = document.createElement('a-entity');
					ansHint.setAttribute('text', {
						value: '*there are multiple answers for this question',
						color: 'gray',
						wrapCount: '34.81',
						width: 'auto',
						height: 'auto',
						anchor: 'right',
						shader: 'msdf',
					});
					let y = height / 2 - padding * 3 + 0.1;

					ansHint.setAttribute('position', {
						x: '0.21',
						y: '0.8',
						z: '0.001',
					});
					ansHint.setAttribute('scale', '2 2 0.001');
					var ans = null;
					var valArr = value.split('()');
					let body = [];
					var idname = this.el.getAttribute('id');
					let submit = document.createElement('a-entity');
					submit.setAttribute('id', 'btnSubmit');
					submit.setAttribute('position', {
						x: '1.3',
						y: -y - padding - 0.3,
						z: '0.01',
					});

					submit.setAttribute('text', {
						value: 'Submit',
						color: 'black',
						font: font,
						wrapCount: '6',
						width: 'auto',
						height: 'auto',
						baseline: 'bottom',
						anchor: 'center',
						xOffset: '0.070',
						yOffset: '1',
						zOffset: '0.001',
						shader: 'msdf',
					});
					submit.setAttribute('geometry', {
						primitive: 'plane',
						width: 'auto',
						height: '0.419',
					});
					submit.setAttribute(
						'material',
						'color: #0FFFFF; shader: flat; visible: false; '
					);

					let feedback = [];
					let current = [];
					let mulAns = 0;
					let mulAnsChecker = 0;
					let totalAns = 0;
					for (let counter = 0; counter < valArr.length; counter++) {
						if (valArr[counter][0] == '/') {
							mulAns++;
						}
					}
					submit.addEventListener('mouseenter', function hoverAns() {
						let submitChecker = document.querySelector('.removeEvent');

						if (!submitChecker) {
							$('.a-canvas.a-grab-cursor:hover').css('cursor', 'pointer');
						} else {
							submit.removeEventListener('mouseenter', hoverAns);
						}
					});
					submit.addEventListener('mouseleave', function hoverAns() {
						let submitChecker = document.querySelector('.removeEvent');
						if (!submitChecker) {
							$('.a-canvas.a-grab-cursor:hover').css('cursor', 'grab');
						} else {
							submit.removeEventListener('mouseleave', hoverAns);
						}
					});
					submit.addEventListener('mousedown', function submitFunc() {
						if (ans != null) {
							submit.classList.add('removeEvent'.concat(idname));
							submit.removeEventListener('mousedown', submitFunc);
							var matchColor = document.querySelectorAll(
								'.selectedAns'.concat(idname)
							);

							var choices = document.querySelectorAll(
								'.answers'.concat(idname)
							);
							for (let x = 0; x < choices.length; x++) {
								$(choices[x]).off();
							}
							var icon = document.querySelector(
								'#'.concat(idname.concat('--open-icon'))
							);
							var feedbackIcon = document.querySelectorAll(
								'#feedbackAns'.concat(idname)
							);
							for (let x = 0; x < feedbackIcon.length; x++) {
								feedbackIcon[x].setAttribute('visible', 'true');
							}
							if (ans) {
								for (let x = 0; x < matchColor.length; x++) {
									matchColor[x].setAttribute('text', 'color: lime');
								}
								submit.setAttribute('text', {
									value: 'Correct',
									color: 'lime',
									font: font,
									align: 'center',
									shader: 'msdf',
									wrapCount: '7',
								});
								icon.setAttribute('material', {
									color: 'white',
									src: 'assets/correct.png',
								});
								var audio1 = new Audio('assets/positive.mp3');
								audio1.volume = 0.2;
								audio1.play();
							} else {
								for (let x = 0; x < matchColor.length; x++) {
									matchColor[x].setAttribute('text', 'color: red');
								}
								submit.setAttribute('text', {
									value: 'False',
									color: 'red',
									align: 'center',
									wrapCount: '7',
									font: font,
									shader: 'msdf',
								});
								icon.setAttribute('material', {
									color: 'white',
									src: 'assets/false.png',
								});
								var audio2 = new Audio('assets/negative.mp3');
								audio2.volume = 0.2;
								audio2.play();
							}
						}
					});
					for (let counter = 0; counter < valArr.length; counter++) {
						body[counter] = document.createElement('a-entity');
						body[counter].setAttribute('id', 'answers'.concat(counter));
						body[counter].setAttribute('class', 'answers'.concat(idname));
						let colorChanger = false;
						if (valArr[counter][0] == '/') {
							valArr[counter] = valArr[counter].substring(1);
							colorChanger = true;
						}
						let newwidth = width - padding * 2;
						body[counter].classList.add('allAns'.concat(idname));

						body[counter].setAttribute('text', {
							value: valArr[counter],
							color: color,
							font: font,
							wrapCount: wrapCount,
							width: newwidth,
							baseline: 'top',
							anchor: 'left',
							xOffset: '0.070',
							yOffset: '1',
							zOffset: '0.001',
							shader: 'msdf',
						});
						body[counter].setAttribute('geometry', {
							primitive: 'plane',
							width: 1,
							height: 'auto',
						});
						body[counter].setAttribute(
							'material',
							'color: #000000; shader: flat; visible: false;width:2'
						);
						current[counter] = false;
						body[counter].addEventListener('mousedown', function changeColor() {
							let checkSelected = document.querySelectorAll(
								'.selectedAns'.concat(idname)
							);
							if (submit.classList.contains('removeEvent'.concat(idname))) {
								body[counter].removeEventListener('mousedown', changeColor);
							} else {
								for (let x = 0; x < checkSelected.length; x++) {
									checkSelected[x].classList.remove(
										'selectedAns'.concat(idname)
									);
								}
								body[counter].classList.add('selectedAns'.concat(idname));
								var allAns = document.querySelectorAll(
									'.answers'.concat(idname)
								);
								if (mulAns > 1) {
									if (current[counter]) {
										body[counter].setAttribute('text', 'color: #000000');
										if (colorChanger) {
											mulAnsChecker--;
										}
										totalAns--;
										current[counter] = false;
									} else {
										body[counter].setAttribute('text', 'color: #e5e619');
										if (colorChanger) {
											mulAnsChecker++;
										}
										totalAns++;
										current[counter] = true;
									}
									if (mulAnsChecker == mulAns && totalAns == mulAns) {
										ans = true;
									} else if (mulAnsChecker == 0) {
										ans = null;
									} else {
										ans = false;
									}
								}
								if (mulAns < 2) {
									for (let c1 = 0; c1 < allAns.length; c1++) {
										allAns[c1].setAttribute('text', 'color: #000000');
									}
									if (colorChanger) {
										ans = true;
									} else {
										ans = false;
									}
									body[counter].setAttribute('text', 'color: #e5e619');
								}
							}
						});

						y -= 0.3;
						if (!AFRAME.utils.device.isMobile()) {
							body[counter].addEventListener('mouseenter', function hoverAns() {
								let submitChecker = document.querySelector(
									'.removeEvent'.concat(idname)
								);

								if (!submitChecker) {
									body[counter].setAttribute(
										'text',
										'font: assets/ralewaybold.json'
									);
									$('.a-canvas.a-grab-cursor:hover').css('cursor', 'pointer');
								} else {
									let removeAns = document.querySelectorAll(
										'.allAns'.concat(idname)
									);
									for (let x = 0; x < removeAns.length; x++) {
										removeAns[x].removeEventListener('mouseenter', hoverAns);
									}
								}
							});
						}
						body[counter].addEventListener('mouseleave', function hoverAns() {
							let submitChecker = document.querySelector(
								'.removeEvent'.concat(idname)
							);
							if (!submitChecker) {
								body[counter].setAttribute('text', 'font: assets/raleway.json');
								$('.a-canvas.a-grab-cursor:hover').css('cursor', 'grab');
							} else {
								let removeAns = document.querySelectorAll(
									'.allAns'.concat(idname)
								);
								for (let x = 0; x < removeAns.length; x++) {
									removeAns[x].removeEventListener('mouseleave', hoverAns);
								}
							}
						});
						body[counter].setAttribute('position', {
							x: '-1.8',
							y: y - 0.16,
							z: 0.01,
						});
						feedback[counter] = document.createElement('a-entity');
						feedback[counter].setAttribute('id', 'feedbackAns'.concat(idname));
						let ansIcon;
						if (colorChanger) {
							ansIcon = 'assets/correct.png';
						} else {
							ansIcon = 'assets/false.png';
						}
						feedback[counter].setAttribute('material', {
							src: ansIcon,
							shader: 'flat',
						});
						feedback[counter].setAttribute('geometry', {
							primitive: 'circle',
							radius: '0.15',
						});
						feedback[counter].setAttribute('position', {
							x: '1.7',
							y: y - 0.08,
							z: 0.002,
						});
						feedback[counter].setAttribute('visible', 'false');
						this.bodyEl = body[counter];
						if (valArr.length - counter == 1) {
							if (mulAns > 1) {
								ansHint.setAttribute('visible', 'true');
							} else {
								ansHint.setAttribute('visible', 'false');
							}
							return [body, submit, feedback, ansHint];
						}
					}
				},

				/**
				 * Generates the dialog plane.
				 */
				generateDialogPlane: function generateDialogPlane() {
					var _this$data6 = this.data,
						width = _this$data6.dialogBoxWidth,
						height = _this$data6.dialogBoxHeight,
						padding = _this$data6.dialogBoxPadding,
						color = _this$data6.dialogBoxColor;
					var plane = this.dialogPlaneEl || document.createElement('a-entity');
					var idname = this.el.getAttribute('id');

					plane.setAttribute(
						'id',
						''.concat(this.el.getAttribute('id'), '--dialog-plane')
					);
					var pos = Object.assign({}, this.el.getAttribute('position'));
					let posz = 0;
					if (pos.z > 0) {
						posz = pos.z - 0.5;
					} else {
						posz = pos.z + 0.5;
					}
					plane.setAttribute('position', {
						x: pos.x,
						y: pos.y,
						z: posz,
					});
					plane.setAttribute('visible', false);
					plane.setAttribute('geometry', {
						primitive: 'plane',
						width: width + padding,
						height: height + padding,
					});

					plane.setAttribute('material', {
						color: color,
						src: 'assets/questionDialog.png',
						transparent: true,
						shader: 'flat',
						opacity: 0.5,
					});
					let answerArr = this.generateBody();
					var roundedBG = document.createElement('a-rounded');
					roundedBG.setAttribute('position', '-1.95 -1.2 0.001');
					roundedBG.setAttribute('rounded', {
						color: '#ffffff',
						width: 3.9,
						height: 2.4,
					});
					roundedBG.setAttribute('material', 'shader:flat;');
					plane.appendChild(roundedBG);
					plane.appendChild(this.generateTitle());
					plane.appendChild(answerArr[3]);
					plane.classList.add('planeChecker');

					for (let counter = 0; counter < answerArr[0].length; counter++) {
						plane.appendChild(answerArr[0][counter]);
						plane.appendChild(answerArr[2][counter]);
					}
					plane.appendChild(answerArr[1]);
					document
						.getElementById('skybox')
						.addEventListener('mouseenter', function () {
							document
								.getElementById(''.concat(idname, '--dialog-plane'))
								.setAttribute(
									'animation__scale',
									'property: scale; to: 0.3 0.3 1; dur:1;'
								);
							document
								.getElementById(''.concat(idname, '--dialog-plane'))
								.setAttribute('visible', 'false');
							document
								.getElementById(''.concat(idname, '--open-icon'))
								.setAttribute('visible', 'true');
						});
					plane.setAttribute('look-at', '#cam');

					this.dialogPlaneEl = plane;
					return plane;
				},
				positionDialogPlane: function positionDialogPlane() {
					if (this.dialogPlaneEl) {
						var vector = this.dialogPlaneEl.object3D.parent.worldToLocal(
							this.cameraEl.object3D.getWorldPosition()
						);
						this.dialogPlaneEl.object3D.lookAt(vector);
					}
				},
				spawnEntities: function spawnEntities() {
					this.el.appendChild(this.generateOpenIcon());
					this.el.appendChild(this.generateDialogPlane());
					this.el.removeAttribute('position');
				},
			});

			/***/
		},
		/******/
	]
);
