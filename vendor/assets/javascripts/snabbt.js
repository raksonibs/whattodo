/*! snabbt.js v0.2.0 built: 2015-01-05 */
!function(a,b){if("object"==typeof exports)module.exports=b();else if("function"==typeof define&&define.amd)define([],function(){return a.returnExportsGlobal=b()});else{var c=b();a.snabbtjs=c,a.snabbt=c.snabbt}}(this,function(){var a=a||{};a.Animation=function(b){this._start_state=b.start_state,this._end_state=b.end_state,this.offset=b.offset,this.duration=b.duration||500,this.delay=b.delay||0,this.easing=a.create_easer("linear"),this.perspective=b.perspective,b.easing&&(this.easing=a.create_easer(b.easing,b)),this._current_state=this._start_state.clone(),b.offset&&(this._current_state.offset_x=this.offset[0],this._current_state.offset_y=this.offset[1],this._current_state.offset_z=this.offset[2],this._end_state.offset_x=this.offset[0],this._end_state.offset_y=this.offset[1],this._end_state.offset_z=this.offset[2]),this.start_time=0,this.current_time=0,this._stopped=!1},a.Animation.prototype.stop=function(){this._stopped=!0},a.Animation.prototype.stopped=function(){return this._stopped},a.Animation.prototype.tick=function(a){if(!this._stopped){this.start_time||(this.start_time=a),a-this.start_time>this.delay&&(this.current_time=a-this.delay);var b=Math.min(Math.max(0,this.current_time-this.start_time),this.duration),c=this.duration;this.easing.tick(b/c),this.update_current_transform()}},a.Animation.prototype.current_state=function(){return this._current_state},a.Animation.prototype.update_current_transform=function(){var b=this.easing.value();a.TweenStates(this._start_state,this._end_state,this._current_state,b)},a.Animation.prototype.completed=function(){return this._stopped?!0:0===this.start_time?!1:this.easing.completed()},a.Animation.prototype.update_element=function(b){var c=this._current_state.as_matrix(),d=this._current_state.properties();a.update_element_transform(b,c,this.perspective),a.update_element_properties(b,d)},a.ValueFeededAnimation=function(b){this.value_feeder=b.value_feeder,this.duration=b.duration||500,this.delay=b.delay||0,this.perspective=b.perspective,this.easing=a.create_easer("linear"),b.easing&&(this.easing=a.create_easer(b.easing,b)),this._current_state=new a.State({}),this.current_matrix=this.value_feeder(0),this.start_time=0,this.current_time=0,this._stopped=!1},a.ValueFeededAnimation.prototype.stop=function(){this._stopped=!0},a.ValueFeededAnimation.prototype.stopped=function(){return this._stopped},a.ValueFeededAnimation.prototype.tick=function(a){if(!this._stopped){this.start_time||(this.start_time=a),a-this.start_time>this.delay&&(this.current_time=a-this.delay);var b=Math.min(Math.max(.001,this.current_time-this.start_time),this.duration),c=this.duration;this.easing.tick(b/c),this.update_current_transform()}},a.ValueFeededAnimation.prototype.current_state=function(){return this._current_state},a.ValueFeededAnimation.prototype.update_current_transform=function(){var a=this.easing.value();this.current_matrix=this.value_feeder(a)},a.ValueFeededAnimation.prototype.completed=function(){return this._stopped?!0:this.easing.completed()},a.ValueFeededAnimation.prototype.update_element=function(b){a.update_element_transform(b,this.current_matrix,this.perspective)},a.ScrollAnimation=function(b){this.start_scroll=window.scrollY,this.end_scroll=b.scroll_pos,this.duration=b.duration||500,this.delay=b.delay||0,this.easing=b.easing||a.cos_easing,this.start_time=0,this.current_time=0},a.ScrollAnimation.prototype.tick=function(a){this.start_time||(this.start_time=a),a-this.start_time>this.delay&&(this.current_time=a-this.delay),this.update_scrolling()},a.ScrollAnimation.prototype.update_scrolling=function(){var a=Math.min(Math.max(.001,this.current_time-this.start_time),this.duration),b=this.duration,c=this.easing(a,b),d=this.end_scroll-this.start_scroll,e=this.start_scroll+c*d;window.scrollTo(0,e)},a.ScrollAnimation.prototype.completed=function(){return 0===this.start_time?!1:this.current_time-this.start_time>this.duration},a.AttentionAnimation=function(b){this.movement=b.movement,this.current_movement=new a.State({}),b.initial_velocity=.1,b.equilibrium_position=0,this.spring=new a.SpringEasing(b),this._stopped=!1},a.AttentionAnimation.prototype.stop=function(){this._stopped=!0},a.AttentionAnimation.prototype.stopped=function(){return this._stopped},a.AttentionAnimation.prototype.tick=function(){this._stopped||this.spring.equilibrium||(this.spring.tick(),this.update_movement())},a.AttentionAnimation.prototype.update_movement=function(){this.current_movement.x=this.movement.x*this.spring.position,this.current_movement.y=this.movement.y*this.spring.position,this.current_movement.z=this.movement.z*this.spring.position,this.current_movement.ax=this.movement.ax*this.spring.position,this.current_movement.ay=this.movement.ay*this.spring.position,this.current_movement.az=this.movement.az*this.spring.position,this.current_movement.bx=this.movement.bx*this.spring.position,this.current_movement.by=this.movement.by*this.spring.position,this.current_movement.bz=this.movement.bz*this.spring.position},a.AttentionAnimation.prototype.update_element=function(b){var c=this.current_movement.as_matrix(),d=this.current_movement.properties();a.update_element_transform(b,c),a.update_element_properties(b,d)},a.AttentionAnimation.prototype.current_state=function(){return this.current_movement},a.AttentionAnimation.prototype.completed=function(){return this.spring.equilibrium||this._stopped},a.create_animation=function(b){return b.value_feeder?new a.ValueFeededAnimation(b):new a.Animation(b)};var a=a||{};a.linear_easing=function(a){return a},a.ease=function(a){return(Math.cos(a*Math.PI+Math.PI)+1)/2},a.ease_in=function(a){return a*a},a.ease_out=function(a){return-Math.pow(a-1,2)+1},a.SpringEasing=function(b){this.position=a.option_or_default(b.start_position,0),this.equilibrium_position=a.option_or_default(b.equilibrium_position,1),this.velocity=a.option_or_default(b.initial_velocity,0),this.spring_constant=a.option_or_default(b.spring_constant,.8),this.deacceleration=a.option_or_default(b.spring_deacceleration,.9),this.mass=a.option_or_default(b.spring_mass,10),this.equilibrium=!1},a.SpringEasing.prototype.tick=function(a){if(0!==a&&!this.equilibrium){var b=-(this.position-this.equilibrium_position)*this.spring_constant,c=b/this.mass;this.velocity+=c,this.position+=this.velocity,this.velocity*=this.deacceleration,Math.abs(this.position-this.equilibrium_position)<.001&&Math.abs(this.velocity)<.001&&(this.equilibrium=!0)}},a.SpringEasing.prototype.value=function(){return this.position},a.SpringEasing.prototype.completed=function(){return this.equilibrium},a.EASING_FUNCS={linear:a.linear_easing,ease:a.ease,"ease-in":a.ease_in,"ease-out":a.ease_out},a.Easer=function(a){this.easer=a,this._value=0},a.Easer.prototype.tick=function(a){this._value=this.easer(a),this.last_value=a},a.Easer.prototype.value=function(){return this._value},a.Easer.prototype.completed=function(){return this.last_value>=1},a.create_easer=function(b,c){if("spring"==b)return new a.SpringEasing(c);var d;return d=a.is_function(b)?b:a.EASING_FUNCS[b],new a.Easer(d)},window.jQuery&&!function(a){a.fn.snabbt=function(a,b){return snabbt(this.get(),a,b)}}(jQuery);var a=a||{};a.snabbt=function(b,c,d){function e(b){return k.tick(b),k.update_element(f),k.stopped()?void 0:k.completed()?void(g.loop>1&&!k.stopped()?(g.loop-=1,k=a.create_animation(j),a.requestAnimationFrame(e)):(g.callback&&g.callback(),m.length&&(g=m.pop(),h=a.state_from_options(i,g,"from_"),i=a.state_from_options(new a.State({}),g,""),a.setup_animation_options(h,i,g),k=new a.Animation(g),a.running_animations.push([f,k]),k.tick(b),a.requestAnimationFrame(e)))):a.requestAnimationFrame(e)}if("scroll"===b)return a.setup_scroll_animation(c);if("attention"===c)return a.setup_attention_animation(b,d);if("stop"===c)return a.stop_animation(b);var f=b,g=c,h=a.current_animation_transform(f);h||(h=a.state_from_options(h,g,"from_"));var i=new a.State({});i=a.state_from_options(i,g,"");var j=a.setup_animation_options(h,i,g),k=a.create_animation(j);if(f.hasOwnProperty("length"))for(var l=0;l<f.length;++l)a.running_animations.push([f[l],k]);else a.running_animations.push([f,k]);k.update_element(f);var m=[],n={then:function(a){return m.unshift(a),n}};return a.requestAnimationFrame(e),n},a.setup_scroll_animation=function(b){function c(b){d.tick(b),d.completed()||a.requestAnimationFrame(c)}var d=new a.ScrollAnimation(b);a.running_animations.push([void 0,d]),a.requestAnimationFrame(c)},a.setup_attention_animation=function(b,c){function d(c){f.tick(c),f.update_element(b),f.completed()||a.requestAnimationFrame(d)}var e=a.state_from_options(new a.State({}),c,"");c.movement=e;var f=new a.AttentionAnimation(c);a.running_animations.push([b,f]),a.requestAnimationFrame(d)},a.stop_animation=function(b){for(var c=0;c<a.running_animations.length;++c){var d=a.running_animations[c][0],e=a.running_animations[c][1];if(b.hasOwnProperty("length"))for(var f=0;f<b.length;++f)d===b[f]&&e.stop();else d===b&&e.stop()}},a.current_animation_transform=function(b){for(var c=0;c<a.running_animations.length;++c){var d=a.running_animations[c][0],e=a.running_animations[c][1];if(!e.stopped()){var f;if(b.hasOwnProperty("length")){for(var g=0;g<b.length;++g)if(d===b[g])return f=e.current_state(),e.stop(),f}else if(d===b)return f=e.current_state(),e.stop(),f}}},a.state_from_options=function(b,c,d){return b||(b=new a.State({})),c[d+"position"]&&(b.x=c[d+"position"][0],b.y=c[d+"position"][1],b.z=c[d+"position"][2]),c[d+"rotation"]&&(b.ax=c[d+"rotation"][0],b.ay=c[d+"rotation"][1],b.az=c[d+"rotation"][2]),c[d+"skew"]&&(b.skew_x=c[d+"skew"][0],b.skew_y=c[d+"skew"][1]),c[d+"rotation_post"]&&(b.bx=c[d+"rotation_post"][0],b.by=c[d+"rotation_post"][1],b.bz=c[d+"rotation_post"][2]),c[d+"scale"]&&(b.sx=c[d+"scale"][0],b.sy=c[d+"scale"][1]),void 0!==c[d+"width"]&&(b.width=c[d+"width"]),void 0!==c[d+"height"]&&(b.height=c[d+"height"]),void 0!==c[d+"opacity"]&&(b.opacity=c[d+"opacity"]),b},a.setup_animation_options=function(a,b,c){return c.start_state=a,c.end_state=b,c},a.tick_requests=[],a.running_animations=[],a.requestAnimationFrame=function(b){a.tick_requests.push(b)},a.tick_animations=function(b){for(var c=a.tick_requests.length,d=0;c>d;++d)a.tick_requests[d](b);a.tick_requests.splice(0,c),window.requestAnimationFrame(a.tick_animations),a.running_animations=a.running_animations.filter(function(a){return!a[1].completed()})},window.requestAnimationFrame(a.tick_animations);var a=a||{};a.assigned_matrix_multiplication=function(a,b,c){return c[0]=a[0]*b[0]+a[1]*b[4]+a[2]*b[8]+a[3]*b[12],c[1]=a[0]*b[1]+a[1]*b[5]+a[2]*b[9]+a[3]*b[13],c[2]=a[0]*b[2]+a[1]*b[6]+a[2]*b[10]+a[3]*b[14],c[3]=a[0]*b[3]+a[1]*b[7]+a[2]*b[11]+a[3]*b[15],c[4]=a[4]*b[0]+a[5]*b[4]+a[6]*b[8]+a[7]*b[12],c[5]=a[4]*b[1]+a[5]*b[5]+a[6]*b[9]+a[7]*b[13],c[6]=a[4]*b[2]+a[5]*b[6]+a[6]*b[10]+a[7]*b[14],c[7]=a[4]*b[3]+a[5]*b[7]+a[6]*b[11]+a[7]*b[15],c[8]=a[8]*b[0]+a[9]*b[4]+a[10]*b[8]+a[11]*b[12],c[9]=a[8]*b[1]+a[9]*b[5]+a[10]*b[9]+a[11]*b[13],c[10]=a[8]*b[2]+a[9]*b[6]+a[10]*b[10]+a[11]*b[14],c[11]=a[8]*b[3]+a[9]*b[7]+a[10]*b[11]+a[11]*b[15],c[12]=a[12]*b[0]+a[13]*b[4]+a[14]*b[8]+a[15]*b[12],c[13]=a[12]*b[1]+a[13]*b[5]+a[14]*b[9]+a[15]*b[13],c[14]=a[12]*b[2]+a[13]*b[6]+a[14]*b[10]+a[15]*b[14],c[15]=a[12]*b[3]+a[13]*b[7]+a[14]*b[11]+a[15]*b[15],c},a.mat_to_css=function(a){for(var b="matrix3d(",c=0;c<a.length-1;++c)b+=Math.abs(a[c])<.01?"0,":a[c].toFixed(10)+"0,";return b+=a[15].toFixed(10)+")"},a.mat_to_css2=function(a){var b="matrix3d("+a[0].toFixed(10)+", "+a[1].toFixed(10)+", "+a[2].toFixed(10)+", "+a[3].toFixed(10)+", "+a[4].toFixed(10)+", "+a[5].toFixed(10)+", "+a[6].toFixed(10)+", "+a[7].toFixed(10)+", "+a[8].toFixed(10)+", "+a[9].toFixed(10)+", "+a[10].toFixed(10)+", "+a[11].toFixed(10)+", "+a[12].toFixed(10)+", "+a[13].toFixed(10)+", "+a[14].toFixed(10)+", "+a[15].toFixed(10)+")";return b},a.mult=function(b,c){var d=new Float32Array(16);return a.assigned_matrix_multiplication(b,c,d),d},a.trans=function(a,b,c){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,a,b,c,1])},a.rotX=function(a){return new Float32Array([1,0,0,0,0,Math.cos(a),-Math.sin(a),0,0,Math.sin(a),Math.cos(a),0,0,0,0,1])},a.rotY=function(a){return new Float32Array([Math.cos(a),0,Math.sin(a),0,0,1,0,0,-Math.sin(a),0,Math.cos(a),0,0,0,0,1])},a.rotZ=function(a){return new Float32Array([Math.cos(a),-Math.sin(a),0,0,Math.sin(a),Math.cos(a),0,0,0,0,1,0,0,0,0,1])},a.skew=function(a,b){return new Float32Array([1,Math.tan(a),0,0,Math.tan(b),1,0,0,0,0,1,0,0,0,0,1])},a.scale=function(a,b){return new Float32Array([a,0,0,0,0,b,0,0,0,0,1,0,0,0,0,1])},a.ident=function(){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])},a.set_css=function(b,c){if(b.hasOwnProperty("length"))for(var d=0;d<b.length;++d)b[d].style.webkitTransform=a.mat_to_css(c),b[d].style.transform=a.mat_to_css(c);else b.style.webkitTransform=a.mat_to_css(c),b.style.transform=a.mat_to_css(c)},a.State=function(b){this.ax=a.option_or_default(b.ax,0),this.ay=a.option_or_default(b.ay,0),this.az=a.option_or_default(b.az,0),this.x=a.option_or_default(b.x,0),this.y=a.option_or_default(b.y,0),this.z=a.option_or_default(b.z,0),this.bx=a.option_or_default(b.bx,0),this.by=a.option_or_default(b.by,0),this.bz=a.option_or_default(b.bz,0),this.skew_x=a.option_or_default(b.skew_x,0),this.skew_y=a.option_or_default(b.skew_y,0),this.offset_x=a.option_or_default(b.offset_x,0),this.offset_y=a.option_or_default(b.offset_y,0),this.offset_z=a.option_or_default(b.offset_z,0),this.sx=a.option_or_default(b.sx,1),this.sy=a.option_or_default(b.sy,1),this.width=b.width,this.height=b.height,this.opacity=a.option_or_default(b.opacity,1)},a.State.prototype.clone=function(){var b=new a.State({ax:this.ax,ay:this.ay,az:this.az,x:this.x,y:this.y,z:this.z,bx:this.bx,by:this.by,bz:this.bz,skew_x:this.skew_x,skew_y:this.skew_y,sx:this.sx,sy:this.sy,height:this.height,width:this.width,opacity:this.opacity});return b},a.State.prototype.assign=function(a){this.ax=a.ax,this.ay=a.ay,this.az=a.az,this.x=a.x,this.y=a.y,this.z=a.z,this.bx=a.bx,this.by=a.by,this.bz=a.bz,this.skew_x=a.skew_x,this.skew_y=a.skew_y,this.sx=a.sx,this.sy=a.sy,this.opacity=a.opacity,this.height=this.height,this.width=this.width},a.State.prototype.as_matrix=function(){var b=a.scale(this.sx,this.sy);return b=a.mult(b,a.skew(this.skew_x,this.skew_y)),b=a.mult(b,a.rotX(this.ax)),b=a.mult(b,a.rotY(this.ay)),b=a.mult(b,a.rotZ(this.az)),b=a.mult(b,a.trans(this.x,this.y,this.z)),b=a.mult(b,a.rotX(this.bx)),b=a.mult(b,a.rotY(this.by)),b=a.mult(b,a.rotZ(this.bz)),b=a.mult(a.trans(this.offset_x,this.offset_y,this.offset_z),b)},a.State.prototype.properties=function(){return{opacity:this.opacity,width:this.width+"px",height:this.height+"px"}};var a=a||{};a.TweenStates=function(a,b,c,d){var e=b.x-a.x,f=b.y-a.y,g=b.z-a.z,h=b.ax-a.ax,i=b.ay-a.ay,j=b.az-a.az,k=b.bx-a.bx,l=b.by-a.by,m=b.bz-a.bz,n=b.sx-a.sx,o=b.sy-a.sy,p=b.skew_x-a.skew_x,q=b.skew_y-a.skew_y,r=b.width-a.width,s=b.height-a.height,t=b.opacity-a.opacity;c.ax=a.ax+d*h,c.ay=a.ay+d*i,c.az=a.az+d*j,c.x=a.x+d*e,c.y=a.y+d*f,c.z=a.z+d*g,c.bx=a.bx+d*k,c.by=a.by+d*l,c.bz=a.bz+d*m,c.skew_x=a.skew_x+d*p,c.skew_y=a.skew_y+d*q,c.sx=a.sx+d*n,c.sy=a.sy+d*o,void 0!==b.width&&(c.width=a.width+d*r),void 0!==b.height&&(c.height=a.height+d*s),void 0!==b.opacity&&(c.opacity=a.opacity+d*t)};var a=a||{};return a.option_or_default=function(a,b){return"undefined"==typeof a?b:a},a._update_element_transform=function(b,c,d){var e="";d&&(e="perspective("+d+"px) "),b.style.webkitTransform=e+a.mat_to_css(c),b.style.transform=e+a.mat_to_css(c)},a.update_element_transform=function(b,c,d){if(b.hasOwnProperty("length"))for(var e=0;e<b.length;++e)a._update_element_transform(b[e],c,d);else a._update_element_transform(b,c,d)},a._update_element_properties=function(a,b){for(var c in b)a.style[c]=b[c]},a.update_element_properties=function(b,c){if(b.hasOwnProperty("length"))for(var d=0;d<b.length;++d)a._update_element_properties(b[d],c);else a._update_element_properties(b,c)},a.is_function=function(a){return"function"==typeof a},a});