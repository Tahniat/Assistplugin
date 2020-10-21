"use strict";

let showWidget = false;
let keyboardNavigation = false;
let readPage = 0;
let contrast = 0;
let defaultElementsStyles = [];
let highlighLinks = false;
let defaultLinksStyles = [];
let fontSize = 0;
let letterSpacing = 0;
let cursorOption = 0;
let defaultElementsCursors = [];
let legibleFonts = 0;
let showPageStructure = false;
let fetchAllHeadingsFlag = false;
let fetchAllLinksFlag = false;

let pageStructureTab = 0;
let widgetEnabled = 0;
let hideUnhide = false;

let selectedPosition = 3;

let widgetHideUnhide = '';

const available_voices = window.speechSynthesis.getVoices();
let english_voice = '';

const serverURL = 'https://citymaasassistweb.uksouth.cloudapp.azure.com/useruipreference';

let utter = new SpeechSynthesisUtterance();

! function setVoice() {
    for (var i = 0; i < available_voices.length; i++) {
        if (available_voices[i].lang === 'en-US') {
            english_voice = available_voices[i];
            break;
        }
    }
    if (english_voice === '') {
        english_voice = available_voices[0];
    }
    window.speechSynthesis.cancel();
}();

! function init() {
    const mainWidget = `
    <html>
    <body>
    <style>
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transform: scale(1.1);
        transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
    }
    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        height: 650px;
        width: 600px;
        border-radius: 0.5rem;
    }
    .close-button {
        cursor: pointer;
        font-size: 30px;
        color: #ffffff;
        margin-top: -5px;
    }
    .show-modal {
        z-index: 1;
        opacity: 1;
        visibility: visible;
        transform: scale(1.0);
        transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
    }
    .button {
        position: absolute;
        width: 90px;
        height: 122px;
        left: 105px;
        top: 200px;
        background: #FFFFFF;
        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
        border-radius: 8px;
        }

    body {font-family: Metropolis, Helvetica, sans-serif;}
* {box-sizing: border-box;}

input[type=text], select, textarea {
  width: 388px;
  padding: 11px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom:5px;
  resize: vertical;
  outline: none;
  background-image:url(magnifier.png);
  background-repeat: no-repeat;
  background-position:right;
  padding-right:2px;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  padding-top:10px;
  margin-left:20px;
} 

.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 25px;
    top:2px;
    left:20px;
  }
  
  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FFFFFF;
    -webkit-transition: .4s;
    transition: .4s;
    border: 1px solid #EFEFEF
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 19px;
    width: 17px;
    left: 4px;
    bottom: 2px;
    background-color: grey;
    -webkit-transition: .4s;
    transition: .4s;
    background-image: url(checker.png);
    background-repeat: no-repeat;
    background-position: left;
    padding-left:1px;
  }
  
  input:checked + .slider {
    background-color: #18FF9E;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #808080;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 12px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }

  .dropbtn {
    background-color: #FFFFFF;
    color:#424141;;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    width:388px;
    box-shadow: 0px 4px 12px rgba(135, 141, 187, 0.15);
    border-radius: 8px;
    text-align:left;
    margin-left:20px;
    outline:none;
  }
  
  
  
  .dropdown {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #ffffff;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width:388px;
    height:437px;
    margin-left:20px;
    border-radius:8px;
  }
  
  .show {display: block;}

  .dropbtntwo {
    background-color: #FFFFFF;
    color: #424141;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    width:388px;
    box-shadow: 0px 4px 12px rgba(135, 141, 187, 0.15);
    border-radius: 8px;
    text-align:left;
    margin-left:20px;
    outline:none;
    margin-top:10px;
  }
  
  
  
  .dropdowntwo {
    position: relative;
    display: inline-block;
  }
  
  .dropdowntwo-content {
    display: none;
    position: absolute;
    background-color: #ffffff;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width:388px;
    height:300px;
    margin-left:20px;
    border-radius:8px;
  }
  
  
  .show {display: block;}

  .dropbtnthree {
    background-color: #FFFFFF;
    color: #424141;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    width:388px;
    box-shadow: 0px 4px 12px rgba(135, 141, 187, 0.15);
    border-radius: 8px;
    text-align:left;
    margin-left:20px;
    outline:none;
    margin-top:10px;
  }
  
  .dropdownthree {
    position: relative;
    display: inline-block;
  }
  
  .dropdownthree-content {
    display: none;
    position: absolute;
    background-color: #ffffff;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width:388px;
    height:308px;
    margin-left:20px;
    border-radius:8px;
  }
  
  .show {display: block;}

   
  .mymodel-bg
            {
                position:fixed;
                display: flex;
                margin-left:20px;
                margin-top:20px;
                height:80vh;
                width:100%;
                justify-content: center;
                align-items: center;
                visibility:hidden;
                opacity:0;
                transition: transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
                opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);  
            }
            .mymodel
            {
               position: relative;
                width: 389px;
                height:610px;
                border-radius:8px; 
               background:#FCFCFC;
               border: 1px solid #F3F3F3;
            }

            .bg-active
            {
            visibility: visible;
            opacity: 1;
            }
            .mymodel-close
            {
                position:absolute;
                top:10px;
                right:10px;
                font-weight:bold;
                cursor: pointer;
            }

            .contentslidecontainer {
                width:70%;
                margin:0px;
              }
              
              .contentslider {
                -webkit-appearance: none;
                width: 100%;
                height: 10px;
                border-radius: 5px;
                background: #d3d3d3;
                outline: none;
                opacity: 0.7;
                -webkit-transition: .2s;
                transition: opacity .2s;
                margin:0px;
              }
              
              .contentslider:hover {
                opacity: 1;
              }
              
              .contentslider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 23px;
                height: 24px;
                border: 0;
                background: url('ellipse.png');
                background-repeat: no-repeat;
                cursor: pointer;
              }

              .contentbutton {
                background-color: #FFFFFF; 
                border: none;
                color: black;
                padding:10px;
                display: inline-block;
                margin:4px 2px;
                width:10px;
                height:10px;
                border-radius:50%;
                cursor: pointer;
                background:url('minus.png');
                background-repeat: no-repeat;
              }

              .contentbuttontwo {
                background-color: #FFFFFF; 
                border: none;
                color: black;
                padding:10px;
                display: inline-block;
                margin:4px 2px;
                width:10px;
                height:10px;
                border-radius:50%;
                cursor: pointer;
                background:url('plus.png');
                background-repeat: no-repeat;
              }

    </style>
        <div id='widget-window-cursor'
        style='display: none; background: #000; min-width: 100% !important; position: absolute!important; height: 12px!important; border: solid 3px #fff300; border-radius: 5px; z-index: 2147483647;'>
        </div>
        <div id='widget-window'
        style='margin-top: 50px; position:absolute; z-index: 10001;  display: flex; justify-content: flex-start; font-family: sans-serif; left: 2px; bottom: 0px;'>
            <div id='widget-main-div-both-container' style='display: flex; flex-direction: row-reverse; align-items: flex-end'>
                <div id="main-widget-container-move" style="text-align: center;overflow: auto; margin-top: 10px; user-select: none; display: none; height: 600px; width: 350px; background-color: #fdfcfc; border-radius: 10px; border: 1px solid #d4d4d4;">
            </div>
            <div id='main-widget-container'
                style='margin-top: 10px;user-select:none; display: none; height:650px; width:437px; background-color:#F8F8FB; border-radius: 15px;border: 1px solid #d4d4d4;'>
                <div
                id='container-1'
                style=' width: 437px; height:380px; border-radius:8px;background: linear-gradient(67.65deg, #4A2972 1.41%, #7737A9 96.89%)!important;'>    
                <img id='option-1-image' style='cursor: pointer; margin-top:25px; margin-left:10px; height: 20px;' src='arrow.png' /> 
                <img id='option-2-image' style='cursor: pointer; width: 32px;margin-top:25px;margin-left:65px;height: 17px;' src ='citylogo.png'/>
                    <img id='option-2-image' style='cursor: pointer; margin-top:25px; width: 14.61px; height: 16.72px;' src ='c.png'/>
                    <img id='option-3-image' style='cursor: pointer; margin-top:25px; height: 16.72px;' src ='i.png' />
                    <img id='option-4-image' style='cursor: pointer; margin-top:25px;width: 14.61px; height: 16.72px;' src ='t.png' />
                    <img id='option-5-image' style='cursor: pointer; margin-top:25px;width: 14.61px; height: 16.72px;' src ='y.png' />
                    <img id='option-6-image' style='cursor: pointer; margin-top:25px; margin-left:10px;width: 14.61px; height: 16.72px;' src ='m.png' />
                    <img id='option-7-image' style='cursor: pointer; margin-top:25px; width: 14.61px; height: 16.72px;' src ='a.png' />
                    <img id='option-8-image' style='cursor: pointer; margin-top:25px; width: 14.61px; height: 16.72px;' src ='capital a.png' />
                    <img id='option-9-image' style='cursor: pointer; margin-top:25px; width: 14.61px; height: 16.72px;' src ='s.png' />
                    <button class="modal-btn" style="background-image:url(Group.png);background-repeat: none;width:20px;
                    height:20px; outline: none; border: none;cursor: pointer;margin-left:40px;"></button>
                    <div class="mymodel-bg">
                         <div class="mymodel">
                         <span class="mymodel-close">X</span>
                         <p pid="heading" style="position: absolute;width: 322px;height: 28px;left:45px;top:40px;font-family: Inter;font-style: normal;font-weight: bold;font-size: 25px;line-height: 28px;color: #000000;";>Choose the desired Language</p>
                         <div id='option-1' 
                         style='position: absolute;
                         width: 108px;
                         height: 60px;
                         left: 75px;
                         top:120px;
                         background:#FFFFFF;
                         box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                         border-radius: 8px;'>
                         <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/us/flat/32.png' />
                         <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                         font-style: normal;
                         font-weight: bold;
                         font-size: 10px;
                         line-height: 11px;
                         text-align: center;
                         letter-spacing: 0.5px;
                         text-transform: uppercase;
                         margin-top: 0px;
                         color: #4B4B4B';>English</p>
                         </div>
                         <div id='option-2' 
                         style='position: absolute;
                         width: 108px;
                         height: 60px;
                         left: 210px;
                         top:120px;
                         background:#FFFFFF;
                         box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                         border-radius: 8px;'>
                         <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;" src='https://www.countryflags.io/ru/flat/32.png' />
                         <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                         font-style: normal;
                         font-weight: bold;
                         font-size: 10px;
                         line-height: 11px;
                         text-align: center;
                         letter-spacing: 0.5px;
                         text-transform: uppercase;
                         margin-top: 0px;
                         color: #4B4B4B';>RUSSIA</p>
                         </div>

                         <div id='option-3' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 left:75px;
                                 top:210px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/il/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Hebrew</p>
                                 </div>

                                 <div id='option-4' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 left: 210px;
                                 top:210px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/pt/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Portugues</p>
                                 </div>   

                                 
                                 <div id='option-5' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 top:300px;
                                 left:75px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/us/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Deutsch</p>
                                 </div>

                                 <div id='option-6' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 left: 210px;
                                 top:300px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/it/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Italiano</p>
                                 </div>

                                 <div id='option-7' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 left:75px;
                                 top:390px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/ae/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Arabic</p>
                                 </div>

                                 <div id='option-8' 
                                     style='position: absolute;
                                     width: 108px;
                                     height: 60px;
                                     left:210px;
                                     top:390px;
                                     background:#FFFFFF;
                                     box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                     border-radius: 8px;'>
                                     <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/cn/flat/32.png' />
                                     <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                     font-style: normal;
                                     font-weight: bold;
                                     font-size: 10px;
                                     line-height: 11px;
                                     text-align: center;
                                     letter-spacing: 0.5px;
                                     text-transform: uppercase;
                                     margin-top: 0px;
                                     color: #4B4B4B';>Chinese</p>
                                     </div>

                                     <div id='option-9' 
                                     style='position: absolute;
                                     width: 108px;
                                     height: 60px;
                                     top:480px;
                                     left:75px;
                                     background:#FFFFFF;
                                     box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                     border-radius: 8px;'>
                                     <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/in/flat/32.png' />
                                     <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                     font-style: normal;
                                     font-weight: bold;
                                     font-size: 10px;
                                     line-height: 11px;
                                     text-align: center;
                                     letter-spacing: 0.5px;
                                     text-transform: uppercase;
                                     margin-top: 0px;
                                     color: #4B4B4B';>Hindi</p>
                                     </div>

                                     <div id='option-10' 
                                 style='position: absolute;
                                 width: 108px;
                                 height: 60px;
                                 left: 210px;
                                 top:480px;
                                 background:#FFFFFF;
                                 box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                                 border-radius: 8px;'>
                                 <img id='option-1-image' style="cursor:pointer;margin-left:35px;margin-bottom:0px;margin-top:5px;" src='https://www.countryflags.io/jp/flat/32.png' />
                                 <p id='para-1' style='color: black !important; cursor: pointer;font-size:10px;font-family: Inter;
                                 font-style: normal;
                                 font-weight: bold;
                                 font-size: 10px;
                                 line-height: 11px;
                                 text-align: center;
                                 letter-spacing: 0.5px;
                                 text-transform: uppercase;
                                 margin-top: 0px;
                                 color: #4B4B4B';>Japanese</p>
                                 </div> 
                              
                      </div>
                 </div> 

                 <script>

                 var modalBtn=document.querySelector('.modal-btn');
                 var modalBg=document.querySelector('.mymodel-bg');
                 var modalClose=document.querySelector('.mymodel-close');
                 modalBtn.addEventListener('click',function(){
                     modalBg.classList.add('bg-active');
                 });
                 modalClose.addEventListener('click',function(){
                     modalBg.classList.remove('bg-active');
                 });
                 </script>

                    <img id='option-11-image' style='cursor: pointer; margin-top:25px; margin-left:20px; height: 20px;' src='person.png' />
                    <div class="container" method="get">
                    <form action="/action_page.php">
                    <label for="fname"></label>
                    <input type="text" id="fname" name="firstname" placeholder="Search dictionary.." style = 'font-family:"Inter";font-style: normal;
                    font-weight: normal;font-size: 16px;line-height: 19px; color: #686868';>
                    </form>
                    </div>
                    <p id = 'para -3' style='color:white;font-family:"Inter";margin-left:20px;margin-top:0px;font-weight:600px; font-size:18px;width: 170px;line-height:16px;'>Preset Configurations </p> 

                    <div id='option-1' 
                            style='position: absolute;
                            width: 90px;
                            height: 122px;
                            left: 115px;
                            top: 180px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;'>
                            <img id='option-1-image' style='cursor: pointer; margin-top:20px; margin-left:30px; height: 20px;' src='Frame.png' />
                            <p id='para-1' style='color: black !important; cursor: pointer; margin-left:25px;margin-top:15px;font-family: "Inter"'> Visual </p>
                            <label class="switch">
                            <input type="checkbox">
                            <span class="slider round"></span>
                            </label>
                            </div>   

                        <div id='option-2' 
                        style='position: absolute;
                        width: 90px;
                        height: 122px;
                        left: 215px;
                        top: 180px;
                        background:#FFFFFF;
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='option-2-image' style='cursor: pointer; margin-top:20px;margin-left:35px;height: 20px;' src='ear.png' />
                        <p id='para-2' style='color: black !important; cursor: pointer;margin-left:22px;margin-top:15px;font-family: "Inter"'> Hearing </p>
                        <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                        </label>
                        </div>   

                        <div id='option-3' 
                        style='position: absolute;
                        width: 90px;
                        height: 122px;
                        left: 315px;
                        top: 180px;
                        background:#FFFFFF;
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='option-3-image' style='cursor: pointer; margin-top:20px; margin-left:35px; height: 20px;' src='hand.png' />
                        <p id='para-3' style='color: black !important; cursor: pointer;margin-left:22px;margin-top:15px;font-family: "Inter"'> Physical </p>
                        <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                        </label>
                        </div>   

                        <div id='option-4' 
                        style='position: absolute;
                        width: 90px;
                        height: 122px;
                        left: 415px;
                        top: 180px;
                        background:#FFFFFF;
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='option-4-image' style='cursor: pointer; margin-top:20px; margin-left:35px; height: 20px;' src='brain.png' />
                        <p id='para-1' style='color: black !important; cursor: pointer;margin-left:18px;margin-top:15px;font-family: "Inter"'> Cognitive </p>
                        <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                        </label>
                        </div>  
                        
                        <p id = 'para -4' style='color:white;font-family:"Inter";margin-left:20px;margin-top:165px;font-weight:600px; font-size:16px;line-height:16px;'>You can select any of the configurations depending upon the necessity and disability.</p> 
                        <div class="dropdown">
                        <button onclick="myFunction()" class="dropbtn">Content Adjustment</button>
                        <div id="myDropdown" class="dropdown-content">
                          
                        <p id="contentpara" style="font-family: Inter;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 16px;
                        margin-left:10px;
                        color: #8F91AC;"> All the adjustments of textual elements of webpage can be done from here</p>
                        <p id="anothercontent" style="font-family: Inter;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 12px;
                        margin-left:10px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        color: #4B4B4B";>FONT ADJUSTMENT<p>
                        
                        <div class="contentslidecontainer" style='margin-left:40px;'>
                        <p id = "value " style='margin-top:1px; font-size:12px;font-family: Inter;color: #4B4B4B;'>+<span id="demo"></span>%<span id="demo"></span></p>
                        <input type="range" min="0" max="100" value="0" class="contentslider" id="myRange">
                        </div>
                        <script>
                            var slider = document.getElementById("myRange");
                            var output = document.getElementById("demo");
                            output.innerHTML = slider.value;
                            slider.oninput = function() {
                            output.innerHTML = this.value;
                            }
                        </script>   
                        <div id='contentbuttonone' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:150px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='parafive'style='color: black !important; cursor: pointer;margin-left:15px;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Readable Font </p>
                        <label class="switch" >
                        <input type="checkbox";>
                        <span class="slider round" ></span>
                        </label>
                        </div>

                        <div id='contentbuttontwo' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:140px;
                        top:150px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='parasix'style='color: black !important; cursor: pointer;margin-left:15px;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Emphasis Tiles </p>
                        <label class="switch" >
                        <input type="checkbox";>
                        <span class="slider round" ></span>
                        </label>
                        </div>

                        <div id='contentbuttonthree' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:260px;
                        top:150px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='paraseven'style='color: black !important; cursor: pointer;margin-left:15px;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Emphasis Links </p>
                        <label class="switch" >
                        <input type="checkbox";>
                        <span class="slider round" ></span>
                        </label>
                        </div>

                        <div id='contentbuttonfour' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:240px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='option-2-image' style='cursor: pointer; margin-left:83px;height: 20px;' src='Rectangle 541.png' />
                        <img id='option-2-image' style='cursor: pointer; margin-top:1px;margin-left:35px;height: 20px;' src='leftalign.png' />
                        <p id='paraseven'style='color: black !important; cursor: pointer;margin-left:15px;font-size:12px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Left Align </p>
                        </div>

                        <div id='contentbuttonfive' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:140px;
                        top:240px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='option-2-image' style='cursor: pointer; margin-top:20px;margin-left:35px;height: 20px;' src='rightalign.png' />
                        <p id='paraseven'style='color: black !important; cursor: pointer;margin-left:13px;font-size:12px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Right Align </p>
                        </div>

                        <div id='contentbuttonsix' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:260px;
                        top:240px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <img id='option-2-image' style='cursor: pointer; margin-top:20px;margin-left:35px;height: 20px;' src='centeralign.png' />
                        <p id='paraseven'style='color: black !important; cursor: pointer;margin-left:9px;font-size:12px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Center Align </p>
                        </div>

                        <div id='contentbuttonseven' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:340px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='paraseven'style='color: black !important; cursor: pointer;margin-left:9px;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Adjust Word Spacing </p>
                        <button class="contentbutton"></button>
                        <button class ="contentbuttontwo" style="margin-left:50px;"></button>
                        </div>

                        <div id='contentbuttoneight' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:140px;
                        top:340px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='paraseven'style='color: black !important; cursor: pointer;margin-left:9px;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Adjust Letter Spacing </p>
                        <button class="contentbutton"></button>
                        <button class ="contentbuttontwo" style="margin-left:50px;"></button>
                        </div>

                        <div id='contentbuttonnine' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:260px;
                        top:340px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='paraseven'style='color: black !important; cursor: pointer;margin-left:9px;font-size:11px;letter-spacing: 0.5px;font-family: "Inter";text-transform: uppercase;'> Adjust Height Spacing </p>
                        <button class="contentbutton"></button>
                        <button class ="contentbuttontwo" style="margin-left:50px;"></button>
                        </div>

                            </div>
                            </div>
                            <script>
                            function myFunction() {
                                document.getElementById("myDropdown").classList.toggle("show");
                            }
                      
                      window.onclick = function(event) {
                        if (!event.target.matches('.dropbtn')) {
                          var dropdowns = document.getElementsByClassName("dropdown-content");
                          var i;
                          for (i = 0; i < dropdowns.length; i++) {
                            var openDropdown = dropdowns[i];
                            if (openDropdown.classList.contains('show')) {
                              openDropdown.classList.remove('show');
                            }
                          }
                        }
                      }
                      </script>

                      <div class="dropdowntwo">
                        <button onclick="myFunction2()" class="dropbtntwo">Style Adjustment</button>
                        <div id="mytwoDropdown" class="dropdowntwo-content">
                        <div id='option-1' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 25px;
                            top: 50px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;'>
                            <p id='para-1' style='color: black !important; cursor: pointer; margin-left:10px;margin-top:15px;font-style: normal;
                            font-weight: bold;
                            font-size: 11px;
                            line-height: 11px;
                            
                            text-align: center;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                            
                            color: #4B4B4B;font-family: "Inter"'> High Saturation</p>
                            </div>   

                            <div id='option-2' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 145px;
                            top: 50px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;'>
                            <p id='para-1' style='color: black !important; cursor: pointer; margin-left:10px;margin-top:15px;font-style: normal;
                            font-weight: bold;
                            font-size: 11px;
                            line-height: 11px;
                            
                            text-align: center;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                            
                            color: #4B4B4B;font-family: "Inter"'> High COntrast</p>
                            </div>   

                            <div id='option-3' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 260px;
                            top: 50px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;'>
                            <p id='para-1' style='color: black !important; cursor: pointer; margin-left:10px;margin-top:15px;font-style: normal;
                            font-weight: bold;
                            font-size: 11px;
                            line-height: 11px;
                            
                            text-align: center;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                            
                            color: #4B4B4B;font-family: "Inter"'> Dark Contrast</p>
                            </div>   

                            <div id='option-4' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 25px;
                            top: 120px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;'>
                            <p id='para-1' style='color: black !important; cursor: pointer; margin-left:10px;margin-top:15px;font-style: normal;
                            font-weight: bold;
                            font-size: 11px;
                            line-height: 11px;
                            
                            text-align: center;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                            
                            color: #4B4B4B;font-family: "Inter"'> Light Contrast</p>
                            </div>   

                            <div id='option-5' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 145px;
                            top: 120px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;'>
                            <p id='para-1' style='color: black !important; cursor: pointer; margin-left:10px;margin-top:15px;font-style: normal;
                            font-weight: bold;
                            font-size: 11px;
                            line-height: 11px;
                            
                            text-align: center;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                            
                            color: #4B4B4B;font-family: "Inter"'> Mono<br>Chrome</p>
                            </div>   

                            <div id='option-6' 
                            style='position: absolute;
                            width: 105px;
                            height: 58px;
                            left: 260px;
                            top: 120px;
                            background:#FFFFFF;
                            box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                            border-radius: 8px;'>
                            <p id='para-1' style='color: black !important; cursor: pointer; margin-left:10px;margin-top:15px;font-style: normal;
                            font-weight: bold;
                            font-size: 11px;
                            line-height: 11px;
                            
                            text-align: center;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                            
                            color: #4B4B4B;font-family: "Inter"'> Invert Colors</p>
                            </div>  

                            <p id ="stylepara" style="font-family: Inter;
                            font-style: normal;
                            font-weight: bold;
                            font-size: 12px;
                            line-height: 19px;
                            /* identical to box height, or 190% */
                            
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                            
                            color: #4B4B4B;margin-top:200px;margin-left:30px;">Text Title Colors</p>

                            <input type="color" id="favcolor" name="favcolor" value="#ff0000" style="margin-left:30px;border-radius:50%;width:20px;";>
                            <input type="color" id="favcolor" name="favcolor" value="#FAFF10" style="outline:none;margin-left:10px;border-radius:50%;width:20px;";>
                            <input type="color" id="favcolor" name="favcolor" value="#3624FF" style="outline:none;margin-left:10px;border-radius:50%;width:20px;";>
                            <input type="color" id="favcolor" name="favcolor" value="#0DFF34" style="outline:none;margin-left:10px;border-radius:50%;width:20px;";>
                            <input type="color" id="favcolor" name="favcolor" value="#FF24F6" style="outline:none;margin-left:10px;border-radius:50%;width:20px;";>
                            <input type="color" id="favcolor" name="favcolor" value="#FFB800" style="outline:none;margin-left:10px;border-radius:50%;width:20px;";>
                            <input type="color" id="favcolor" name="favcolor" value="#000000" style="outline:none;margin-left:10px;border-radius:50%;width:20px;";>
                            <input type="color" id="favcolor" name="favcolor" value="#4A2972" style="outline:none;margin-left:10px;border-radius:50%;width:20px;";>
                            </div>
                            </div>
                            <script>
                            function myFunction2() {
                                document.getElementById("mytwoDropdown").classList.toggle("show");
                            }
                      
                      window.onclick = function(event) {
                        if (!event.target.matches('.dropbtntwo')) {
                          var dropdowns = document.getElementsByClassName("dropdowntwo-content");
                          var i;
                          for (i = 0; i < dropdowns.length; i++) {
                            var openDropdown = dropdowns[i];
                            if (openDropdown.classList.contains('show')) {
                              openDropdown.classList.remove('show');
                            }
                          }
                        }
                      }
                      </script>

                      <div class="dropdownthree">
                        <button onclick="myFunction3()" class="dropbtnthree">Navigation Adjustments</button>
                        <div id="mythreeDropdown" class="dropdownthree-content">

                        <div id='contentbuttonone' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:20px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='parafive'style='color: black !important; cursor: pointer;margin-left:13px;font-weight: bold;
                        font-size: 10px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        
                        color: #4B4B4B;font-family: "Inter"'> Screen Reading Guide </p>
                        <label class="switch" >
                        <input type="checkbox";>
                        <span class="slider round" ></span>
                        </label>
                        </div>

                        <div id='contentbuttotwo' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:140px;
                        top:20px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='parafive'style='color: black !important; cursor: pointer;margin-left:15px;font-size:10px;font-weight:bold;font-family: "Inter";text-transform: uppercase;'> MUTE <br>SOUNDS </p>
                        <label class="switch" >
                        <input type="checkbox";>
                        <span class="slider round" ></span>
                        </label>
                        </div>

                        <div id='contentbuttonthree' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:260px;
                        top:20px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='parafive'style='color: black !important; cursor: pointer;margin-left:13px;font-weight: bold;
                        font-size: 10px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        
                        color: #4B4B4B;font-family: "Inter"'> Screen Reading Guide </p>
                        <label class="switch" >
                        <input type="checkbox";>
                        <span class="slider round" ></span>
                        </label>
                        </div>

                        <div id='contentbuttonfour' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:110px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='parafive'style='color: black !important; cursor: pointer;margin-left:13px;font-weight: bold;
                        font-size: 10px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        
                        color: #4B4B4B;font-family: "Inter"'> Highlight Focus </p>
                        <label class="switch" >
                        <input type="checkbox";>
                        <span class="slider round" ></span>
                        </label>
                        </div>

                        <div id='contentbuttonfive' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:140px;
                        top:110px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='parafive'style='color: black !important; cursor: pointer;margin-left:13px;font-weight: bold;
                        font-size: 10px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        
                        color: #4B4B4B;font-family: "Inter"'> Highlight Hover </p>
                        <label class="switch" >
                        <input type="checkbox";>
                        <span class="slider round" ></span>
                        </label>
                        </div>

                        <div id='contentbuttonsix' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:260px;
                        top:110px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='parafive'style='color: black !important; cursor: pointer;margin-left:13px;font-weight: bold;
                        font-size: 10px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        
                        color: #4B4B4B;font-family: "Inter"'> Reading Highlight </p>
                        <label class="switch" >
                        <input type="checkbox";>
                        <span class="slider round" ></span>
                        </label>
                        </div>

                        <div id='contentbuttonseven' 
                        style='position: absolute;
                        width: 105px;
                        height: 75px;
                        left:20px;
                        top:200px;
                        background:#FFFFFF;
                        border: 1px solid rgba(223, 223, 223, 0.75);
                        box-shadow: 0px 0px 8px rgba(180, 180, 180, 0.25);
                        border-radius: 8px;'>
                        <p id='parafive'style='color: black !important; cursor: pointer;margin-left:13px;font-weight: bold;
                        font-size: 10px;
                        line-height: 11px;
                        letter-spacing: 0.5px;
                        text-transform: uppercase;
                        
                        color: #4B4B4B;font-family: "Inter"'> Keyboard Navigation </p>
                        <label class="switch" >
                        <input type="checkbox";>
                        <span class="slider round" ></span>
                        </label>
                        </div>
                          
                            </div>
                            </div>
                            <script>
                            function myFunction3() {
                                document.getElementById("mythreeDropdown").classList.toggle("show");
                            }
                      
                      window.onclick = function(event) {
                        if (!event.target.matches('.dropbtnthree')) {
                          var dropdowns = document.getElementsByClassName("dropdownthree-content");
                          var i;
                          for (i = 0; i < dropdowns.length; i++) {
                            var openDropdown = dropdowns[i];
                            if (openDropdown.classList.contains('show')) {
                              openDropdown.classList.remove('show');
                            }
                          }
                        }
                      }
                      </script>

                      
                        </div>
                        </div>



            <div style='display: flex; position: relative; margin-left: 0' id='widget-main-icon-div' >
                <img
                id='widget-main-icon-div-icon' 
                src='walkingman.png'
                style='cursor: pointer; height: 95px;' onclick="toggleWidget()" onmouseover="mouseOverWid(this)" onmouseout="mouseOutWid(this)"/>
                <div 
                    id='widget-option-main-icon'
                    style='position: absolute; display: none; width: 100%; justify-content: flex-end;'>
                    <img id='widget-main-icon-tick' src='walkingman.png' height='32px' />
                </div>
            </div>
            </div>
        </div>
    </body>
    </html>
    `;
    document.write(mainWidget);
    widgetHideUnhide = document.getElementById('hide');
    clickAwayListener();
    onMouseMoveListener();
    isPluginActive();
    document.addEventListener('keyup', doc_keyUp, false);
    resizeWindowEvent();
    addWindowResizeEvent();
    // loadPreference();
    // initializePayment();
    // openModal();
}();

function addWindowResizeEvent() {
    window.addEventListener('resize', resizeWindowEvent);
}

function resizeWindowEvent() {
    const width = window.outerWidth;
    const height = window.outerHeight;
    const linksModal = document.getElementById('widget-modal-content');
    const optionContainer = document.getElementById('main-widget-container');
    const moveHideContainer = document.getElementById('main-widget-container-move');
    const moveHideImage = document.getElementById('widget-move-options-container-image');
    const moveButtons = document.getElementById('widget-move-options-container-buttons');
    console.log(moveButtons.childNodes);
    if (width <= 670) {
        linksModal.style.width = '90%';
    } else {
        linksModal.style.width = '600px';
    }
    if (width <= 390) {
        optionContainer.style.width = '210px';
        moveHideContainer.style.width = '210px';
        moveHideImage.style.width = '90%';
        moveButtons.style.flexDirection = 'column';
        moveButtons.childNodes[1].style.width = '120px';
        moveButtons.childNodes[3].style.marginLeft = '0px';
    } else if (width <= 500) {
        optionContainer.style.width = '280px';
        moveHideContainer.style.width = '280px';
        moveHideImage.style.width = '90%';
        moveButtons.style.flexDirection = 'row';
        moveButtons.childNodes[1].style.width = '90px';
        moveButtons.childNodes[3].style.marginLeft = '15px';
    } else {
        optionContainer.style.width = '350px';
        moveHideContainer.style.width = '350px';
        moveHideImage.style.width = 'unset';
        moveButtons.childNodes[1].style.width = '120px';
    }
    console.log(height);
    if (height <= 700) {
        optionContainer.style.height = `${height - 120}px`;
        optionContainer.style.overflow = 'auto';
    } else {
        optionContainer.style.height = '600px'
        optionContainer.style.overflow = 'unset';

    }
}

async function loadPreference() {
    // const email = 'shafia@citymaas.io';
    const email = sessionStorage.getItem('email');
    if (email) {
        await fetch(serverURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(`user_email=${email}&mode=fetch`)
            // body: new URLSearchParams(`user_email=${email}&mode=fetch`)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                const values = data.User_Preference[0];
                const {
                    keyboard_nav,
                    read_page,
                    contrast,
                    highlight_links,
                    font_size,
                    letter_spacing,
                    cursor_option,
                    legible_fonts,
                } = values;
                console.log(data)
                onClickOption9();
                //option 1
                if (keyboard_nav) {
                    keyboardNavigation = !keyboard_nav;
                    onClickOption1(false);
                }
                //option 2
                if (read_page) {
                    const tempValue = parseInt(read_page);
                    if (tempValue !== 0) {
                        readPage = 0;
                        runOperation(tempValue, onClickOption2);
                    }
                }
                //option 3
                if (contrast) {
                    const tempValue = parseInt(contrast);
                    if (tempValue !== 0) {
                        contrast = 0;
                        runOperation(tempValue, onClickOption3);
                    }
                }
                //option 4
                if (highlight_links) {
                    highlighLinks = !highlight_links;
                    onClickOption5(false);
                }
                //option 5
                if (font_size) {
                    const tempValue = parseInt(font_size);
                    if (tempValue !== 0) {
                        fontSize = 0;
                        runOperation(tempValue, onClickOption5);
                    }
                }
                //option 6
                if (letter_spacing) {
                    const tempValue = parseInt(letter_spacing);
                    if (tempValue !== 0) {
                        letterSpacing = 0;
                        runOperation(tempValue, onClickOption6);
                    }
                }
                //option 7
                if (cursor_option) {
                    const tempValue = parseInt(cursor_option);
                    if (tempValue !== 0) {
                        cursorOption = 0;
                        runOperation(tempValue, onClickOption7);
                    }
                }
                //option 8
                if (legible_fonts) {
                    const tempValue = parseInt(legible_fonts);
                    if (tempValue !== 0) {
                        legibleFonts = 0;
                        runOperation(tempValue, onClickOption8);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

function savePreferences() {
    // const email = 'shafia@citymaas.io';
    const email = sessionStorage.getItem('email');
    if (email) {
        const params = [
            `user_email=${email}`,
            `keyboard_nav=${keyboardNavigation}`,
            `read_page=${readPage}`,
            `contrast=${contrast}`,
            // `key_nav=${keyboardNavigation}`,
            `font_size=${fontSize}`,
            `letter_spacing=${letterSpacing}`,
            `cursor_option=${cursorOption}`,
            `legible_fonts=${legibleFonts}`,
            `highlight_links=${highlighLinks}`,
            `update_time=${Math.round((new Date()).getTime() / 1000)}`,
            `mode=submit`,
        ];
        fetch(serverURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(params.join('&'))
        })
    }
}

function runOperation(tempValue, optionHandler) {
    const times = Array(tempValue).fill(0);
    times.map(() => optionHandler(false))
}

function initializePayment() {

    // const genesis = require('./config/genesis.js/lib/genesis');
    // const genesis = './config/default.json';
    console.log(window.genesis);
    console.log(window);

    // import * as genesis from './node_modules/genesis.js/lib/genesis';
    console.log(genesis);
}

function openModal() {
    fetchAllHeadings();
    const modal = document.querySelector(".modal");
    modal.classList.toggle("show-modal");
    showPageStructure = !showPageStructure;
}

function clickAwayListener() {
    const widgetContainer = document.getElementById("widget-window");
    const widgetModal = document.getElementById("widget-modal");
    window.onclick = function (event) {
        if (readPage !== 0) {
            readPageText(event.target);
        }
        if (showPageStructure) {
            if (event.target == widgetModal) {
                openModal()
                showPageStructure = !showPageStructure;
            }
        } else {
            if (event.target == widgetContainer) {
                const mainWidgetContainer = document.getElementById('main-widget-container');
                mainWidgetContainer.style.display = "none";

                if (selectedPosition === 1 || selectedPosition === 3) {
                    const mainContainer = document.getElementById('widget-main-div-both-container');
                    mainContainer.style.flexDirection = 'row';
                }
                if (selectedPosition === 2 || selectedPosition === 4) {
                    const mainContainer = document.getElementById('widget-main-div-both-container');
                    mainContainer.style.flexDirection = 'row-reverse';
                }

                showWidget = !showWidget;
            }
        }
    }
}

function onMouseMoveListener() {
    window.addEventListener('mousemove', e => {
        if (cursorOption === 2) {
            const readingLine = document.getElementById('widget-window-cursor');
            console.log(e);
            if (e.pageY > 30) {
                readingLine.style.marginTop = `${parseInt(e.pageY) - 80}px`;
            } else {
                readingLine.style.marginTop = parseInt(e.pageY) - 15;
            }
        }
    });
}

function doc_keyUp(e) {

    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.ctrlKey && e.keyCode == 85) {
        // call your function to do the thing
        toggleWidget();
    }
}

function toggleWidget() {
    if (showWidget) {
        let x = document.getElementById("main-widget-container");
        x.style.display = "none";

        let y = document.getElementById("main-widget-container-move");
        y.style.display = "none";

        if (selectedPosition === 1 || selectedPosition === 3) {
            const mainContainer = document.getElementById('widget-main-div-both-container');
            mainContainer.style.flexDirection = 'row';
        }
        if (selectedPosition === 2 || selectedPosition === 4) {
            const mainContainer = document.getElementById('widget-main-div-both-container');
            mainContainer.style.flexDirection = 'row-reverse';
        }

        showWidget = !showWidget;
    } else {
        mouseOutWid();
        let x = document.getElementById("main-widget-container");
        x.style.display = "block";
        showWidget = !showWidget;

        if (selectedPosition === 1 || selectedPosition === 3) {
            const mainContainer = document.getElementById('widget-main-div-both-container');
            mainContainer.style.flexDirection = 'row-reverse';
        }

        if (selectedPosition === 2 || selectedPosition === 4) {
            const mainContainer = document.getElementById('widget-main-div-both-container');
            mainContainer.style.flexDirection = 'row';
        }
    }
}

function mouseOverWid() {
    if (!showWidget) {
        widgetHideUnhide.style.display = 'block';
    }

}

function mouseOutWid() {
    // const w = document.getElementById('hide');
    // w.style.display = "none";
    setTimeout(
        function () {
            widgetHideUnhide.style.display = 'none';
        },
        1000);

}

function mouseover(id) {
    const x = document.getElementById(id);
    x.style.backgroundColor = "#f1f4f7";



}

function mouseout(id) {
    const x = document.getElementById(id);
    x.style.backgroundColor = "inherit";
}


function onHideClick() {
    if (!hideUnhide) {
        const x = document.getElementById("widget-main-icon-div");
        x.style.position = "absolute";
        if (selectedPosition === 1 || selectedPosition === 3) {
            x.style.marginLeft = "-60px";
        } else {
            x.style.marginLeft = "50px";
        }

        const currentlElemText = document.getElementById('option-hide');
        currentlElemText.innerHTML = 'Unhide';

        let y = document.getElementById("main-widget-container");
        y.style.display = "none";

        // const currentlElemHide = document.getElementById('hide');
        // currentlElemHide.style.right = '40px';

        hideUnhide = !hideUnhide
    } else {
        const x = document.getElementById("widget-main-icon-div");
        x.style.position = "relative";
        x.style.marginLeft = "0";

        const currentlElemText = document.getElementById('option-hide');
        currentlElemText.innerHTML = 'Hide';

        // const currentlElemHide = document.getElementById('hide');
        // currentlElemHide.style.right = '22px';

        hideUnhide = !hideUnhide
    }
}


function isPluginActive() {
    const currentWidImage = document.getElementById('widget-main-icon-div-icon');
    if (widgetEnabled !== 0) {
        currentWidImage.src = 'walkingman.png';
    } else {
        currentWidImage.src = 'walkingman.png';
    }
    // if (keyboardNavigation) console.log('came 1');
    // if (readPage) console.log('came 2');
    // if (contrast) console.log('came 3');
    // if (highlighLinks) console.log('came 4');
    // if (fontSize) console.log('came 5');
    // if (letterSpacing) console.log('came 6');
    // if (cursorOption) console.log('came 7');
    // if (legibleFonts) console.log('came 8');
    // if (
    //     keyboardNavigation || readPage || contrast || highlighLinks
    //     || fontSize || letterSpacing || cursorOption || legibleFonts) {
    //     const activeIcon = document.getElementById('widget-option-main-icon');
    //     activeIcon.style.display = 'flex';
    // } else {
    //     const activeIcon = document.getElementById('widget-option-main-icon');
    //     activeIcon.style.display = 'none';
    // }
}

function onClickOption1(type = true) {
    console.log(widgetEnabled);
    if (keyboardNavigation) {
        widgetEnabled = widgetEnabled - 1;
        // if (widgetEnabled === 0) {
        //     const currentWidImage = document.getElementById('widget-main-icon-div-icon');
        //     currentWidImage.src = 'https://citywebassist.blob.core.windows.net/frontendicons/front_end_icon_assests/assist-icon.png';
        // }

        const elems = document.querySelectorAll("*");
        let index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].addEventListener('focusin', (event) => {
                event.target.style.outline = '-webkit-focus-ring-color auto 5px';
            });
        }
        const currentElem = document.getElementById('option-1')
        currentElem.style.border = 'none';
        currentElem.style.borderRight = '1px solid rgb(193, 193, 193)';
        currentElem.style.borderBottom = '1px solid rgb(193, 193, 193)';
        currentElem.style.borderRadius = 0;
        currentElem.style.borderTopLeftRadius = 5;
        currentElem.style.marginTop = 0;


        const currentElemChecked = document.getElementById('option-1-icon');
        currentElemChecked.style.display = 'none';
        keyboardNavigation = false;
    } 
    isPluginActive();
    if (type) {
        savePreferences();
    }
}





function applyMoveWidget(value) {
    const getWindow = document.getElementById('widget-window');
    const mainContainer = document.getElementById('widget-main-div-both-container');
    const hideUnhideWidget = document.getElementById('hide');

    if (value === 'widget-option-top-left') {
        getWindow.style.justifyContent = 'flex-start';
        // getWindow.style.width = '452px !important';
        getWindow.style.right = 'auto';
        getWindow.style.bottom = 'auto';

        mainContainer.style.flexDirection = 'row-reverse';
        mainContainer.style.alignItems = 'flex-start';

        hideUnhideWidget.style.marginLeft = '80px';

        selectedPosition = 1;
    } else if (value === 'widget-option-top-right') {
        if (selectedPosition !== 0) {
            // getWindow.style.justifyContent = 'flex-end';
            // getWindow.style.width = '100%';
            getWindow.style.right = 2;
            getWindow.style.bottom = 'auto';

            mainContainer.style.flexDirection = 'row';
            mainContainer.style.alignItems = 'flex-start';

            hideUnhideWidget.style.marginLeft = '-20px';

            selectedPosition = 2;
        }
    } else if (value === 'widget-option-bottom-left') {
        getWindow.style.right = 'auto';
        getWindow.style.bottom = 2;

        mainContainer.style.flexDirection = 'row-reverse';
        mainContainer.style.alignItems = 'flex-end';

        hideUnhideWidget.style.marginLeft = '80px';

        selectedPosition = 3;
    } else if (value === 'widget-option-bottom-right') {
        getWindow.style.bottom = '2px';
        getWindow.style.right = '2px';

        mainContainer.style.alignItems = 'flex-end';
        mainContainer.style.flexDirection = 'row';

        selectedPosition = 4;
    }

}

function onChangeMoveOption(event) {
    const value = event.target.value;
    if (value === 'widget-option-top-left') {
        // const radio1 = document.get
    }
}

function scrollToElement(elem) {
    openModal();
    elem.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

function onClickLink(elem) {
    openModal();
    // elem.click();
    if (elem.href) {
        window.open(
            elem.href, "_blank");
    }
    // elem.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
}

function fetchAllHeadings() {
    if (!fetchAllHeadingsFlag) {
        const contentDiv = document.getElementById('widget-modal-header-tabs-1-content');
        const allElems = Array.from(document.querySelectorAll('*'));
        const allHeadings = allElems.filter(item => {
            const tag = item.tagName.toString().toLowerCase();
            if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6') {
                return true;
            }
            return false;
        })

        const leftSpacing = {
            'H1': 0,
            'H2': '10px',
            'H3': '20px',
            'H4': '30px',
            'H5': '40px',
            'H6': '50px',
        };

        allHeadings.map((eachItem, index) => {
            const eachDiv = document.createElement("div");
            eachDiv.id = 'widget-modal-header-tabs-content-each-heading';
            eachDiv.style.display = 'flex';
            eachDiv.style.marginLeft = leftSpacing[eachItem.tagName];
            eachDiv.style.cursor = 'pointer';
            if (index > 0) {
                eachDiv.style.marginTop = '10px';
            }

            eachDiv.onclick = function () {
                scrollToElement(eachItem);
            };

            const eachDivIconDiv = document.createElement("div");
            eachDivIconDiv.id = 'widget-modal-header-tabs-content-each-heading-icon-div';
            eachDivIconDiv.style.display = 'flex';
            eachDivIconDiv.style.fontSize = '12px !important';
            eachDivIconDiv.style.fontWeight = '400';
            eachDivIconDiv.style.textTransform = 'uppercase';
            eachDivIconDiv.style.background = '#1e242a';
            eachDivIconDiv.style.opacity = '0.8';
            eachDivIconDiv.style.borderRadius = '5px';
            eachDivIconDiv.style.alignItems = 'center';
            eachDivIconDiv.style.justifyContent = 'center';
            eachDivIconDiv.style.alignSelf = 'center';
            eachDivIconDiv.style.height = '27px';
            eachDivIconDiv.style.width = '30px';
            eachDiv.style.cursor = 'pointer';

            const eachDivIconText = document.createElement("p");
            eachDivIconText.id = 'widget-modal-header-tabs-content-each-heading-icon';
            eachDivIconText.style.color = '#ffffff';
            eachDivIconText.style.margin = '0 8px';
            eachDiv.style.cursor = 'pointer';

            const eachDivIconTextData = document.createTextNode(eachItem.tagName);
            eachDivIconTextData.id = 'widget-modal-header-tabs-content-each-heading-icon';
            eachDiv.style.cursor = 'pointer';

            eachDivIconText.appendChild(eachDivIconTextData);   //appended text to the heading icon
            eachDivIconDiv.appendChild(eachDivIconText);        //appended icon with text inside in first div

            const eachDivTextDiv = document.createElement("div");
            eachDivTextDiv.id = 'widget-modal-header-tabs-content-each-heading-text-div';
            eachDivTextDiv.style.display = 'flex';
            eachDivTextDiv.style.fontSize = '13px!important';
            eachDivTextDiv.style.alignItems = 'center';
            eachDivTextDiv.style.height = 'auto';
            eachDiv.style.cursor = 'pointer';

            const eachDivTextText = document.createElement("p");
            eachDivTextText.id = 'widget-modal-header-tabs-content-each-heading-text';
            eachDivTextText.style.color = '#006dd5';
            eachDivTextText.style.margin = '0';
            eachDivTextText.style.marginLeft = '10px';
            eachDiv.style.cursor = 'pointer';

            const eachDivTextTextData = document.createTextNode(eachItem.innerText);
            eachDivTextTextData.id = 'widget-modal-header-tabs-content-each-heading-text';
            eachDiv.style.cursor = 'pointer';

            eachDivTextText.appendChild(eachDivTextTextData);   //appended text to the heading icon
            eachDivTextDiv.appendChild(eachDivTextText);        //appended icon with text inside in second div

            eachDiv.appendChild(eachDivIconDiv);                //appended first div to each row div
            eachDiv.appendChild(eachDivTextDiv);                //appended first div to each row div

            contentDiv.appendChild(eachDiv);
        })
        fetchAllHeadingsFlag = true;
    }
}

function fetchAllLinks() {
    if (!fetchAllLinksFlag) {
        const contentDiv = document.getElementById('widget-modal-header-tabs-2-content');
        const allElems = Array.from(document.querySelectorAll('a'));

        allElems.map((eachItem, index) => {
            const eachDiv = document.createElement("div");
            eachDiv.id = 'widget-modal-header-tabs-content-each-heading';
            eachDiv.style.display = 'flex';
            eachDiv.style.cursor = 'pointer';
            if (index > 0) {
                eachDiv.style.marginTop = '10px';
            }

            eachDiv.onclick = function () {
                onClickLink(eachItem);
            };

            const eachDivIconDiv = document.createElement("div");
            eachDivIconDiv.id = 'widget-modal-header-tabs-content-each-heading-icon-div';
            eachDivIconDiv.style.display = 'flex';
            eachDivIconDiv.style.fontSize = '12px !important';
            eachDivIconDiv.style.fontWeight = '400';
            eachDivIconDiv.style.textTransform = 'uppercase';
            eachDivIconDiv.style.background = '#1e242a';
            eachDivIconDiv.style.opacity = '0.8';
            eachDivIconDiv.style.borderRadius = '5px';
            eachDivIconDiv.style.alignItems = 'center';
            eachDivIconDiv.style.justifyContent = 'center';
            eachDivIconDiv.style.alignSelf = 'center';
            eachDivIconDiv.style.height = '27px';
            eachDivIconDiv.style.width = '30px';
            eachDiv.style.cursor = 'pointer';

            const eachDivIconText = document.createElement("p");
            eachDivIconText.id = 'widget-modal-header-tabs-content-each-heading-icon';
            eachDivIconText.style.color = '#ffffff';
            eachDivIconText.style.margin = '0 8px';
            eachDiv.style.cursor = 'pointer';

            const eachDivIconTextData = document.createTextNode(eachItem.tagName);
            eachDivIconTextData.id = 'widget-modal-header-tabs-content-each-heading-icon';
            eachDiv.style.cursor = 'pointer';

            eachDivIconText.appendChild(eachDivIconTextData);   //appended text to the heading icon
            eachDivIconDiv.appendChild(eachDivIconText);        //appended icon with text inside in first div

            const eachDivTextDiv = document.createElement("div");
            eachDivTextDiv.id = 'widget-modal-header-tabs-content-each-heading-text-div';
            eachDivTextDiv.style.display = 'flex';
            eachDivTextDiv.style.fontSize = '13px!important';
            eachDivTextDiv.style.alignItems = 'center';
            eachDivTextDiv.style.height = 'auto';
            eachDiv.style.cursor = 'pointer';

            const eachDivTextText = document.createElement("p");
            eachDivTextText.id = 'widget-modal-header-tabs-content-each-heading-text';
            eachDivTextText.style.color = '#006dd5';
            eachDivTextText.style.margin = '0';
            eachDivTextText.style.marginLeft = '10px';
            eachDiv.style.cursor = 'pointer';

            const eachDivTextTextData = document.createTextNode(eachItem.innerText || eachItem.ariaLabel || '');
            eachDivTextTextData.id = 'widget-modal-header-tabs-content-each-heading-text';
            eachDiv.style.cursor = 'pointer';

            eachDivTextText.appendChild(eachDivTextTextData);   //appended text to the heading icon
            eachDivTextDiv.appendChild(eachDivTextText);        //appended icon with text inside in second div

            eachDiv.appendChild(eachDivIconDiv);                //appended first div to each row div
            eachDiv.appendChild(eachDivTextDiv);                //appended first div to each row div

            contentDiv.appendChild(eachDiv);
        })
        fetchAllLinksFlag = true;
    }
}