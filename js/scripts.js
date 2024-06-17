const selectLight = document.querySelector('#select-light');
const selectGroup = document.querySelector('#select-group');
const colorPicker = document.querySelector('#select-color');
const lightGroups = document.querySelector('#light-groups');
// const groupTitle = document.querySelector('#group-title');
var selectedLight = 'all';
var selectedColor = 'e995b7';
var url;
var currentUrl = document.querySelector('.current-url');
var groupArr = [];
var groupArr2 = [];

changeUrl();

function changeUrl() {
  console.log(selectedLight);
  url = '?light=' + selectedLight + '&color=' + selectedColor;
  currentUrl.innerHTML = '<span class="b">Current URL:</span> "/' + url + '"';
}

axios
  .get('lifx_get.php')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

function buildLightSelect() {
  axios
    .get('lifx_get.php')
    .then((data) =>
      data.data.map(function (light) {
        var lightLabel = light.label;
        var lightId = light.id;
        var lightSlug = slugify(lightLabel);
        var lightOption = document.createElement('option');
        lightOption.setAttribute('value', lightId);
        lightOption.innerHTML = lightLabel;
        // selectLight.appendChild(lightOption);

        var groupLabel = light.group.name;
        var groupID = light.group.id;
        var groupOption = document.createElement('option');
        groupOption.setAttribute('value', groupID);
        groupOption.innerHTML = groupLabel;
        // selectGroup.appendChild(groupOption)
        groupArr2.push(groupOption);

        groupArr.push(groupOption.innerText);

        lightGroups.innerHTML =
          lightGroups.innerHTML +
          '<div class="light-container w-33-l w-40-m w-100 mr3-m mr0-l" data-light-group-id="' +
          groupID +
          '" data-light-id="' +
          lightId +
          '" id="' +
          lightSlug +
          '"><div class="light flex items-center mb3"><span class="light-select"></span><h4 class="mv0">' +
          lightLabel +
          '</h4></div></div>';
        // option.setAttribute('value', groupID);
        // option.innerHTML = groupLabel;
        // groupArr.push(option);
        // for (let i = 0; i < selectLight.childNodes.length; i++) {
        //   console.log('Loop Text = ' + selectLight.childNodes[i].innerText);
        //   console.log('Group Text = ' + groupLabel);
        //   console.log('///////////////////////////////////');
        //   if (selectLight.childNodes[i].innerText != groupLabel) {
        //     selectLight.appendChild(option);
        //   }
        // }
        // console.log(selectLight.childNodes);
      })
    )
    .then(function () {
      var uniq = [...new Set(groupArr)];
      for (let i = 0; i < uniq.length; i++) {
        for (let j = 0; j < groupArr2.length; j++) {
          if (groupArr2[j].innerText == uniq[i]) {
            selectGroup.appendChild(groupArr2[j]);
            var groupVal = groupArr2[j].value;
            var groupName = groupArr2[j].innerText;
            var groupSlug = slugify(groupName);
            var groupContainer =
              '<div class="group-container dn pv4 w-100" data-group-id="' +
              groupVal +
              '" id="' +
              groupSlug +
              '"><div class="group"><h3 class="mb0">' +
              groupName +
              '</h3><div class="group-lights flex flex-wrap pv3">' +
              '<div class="light-container w-33-l w-40-m w-100 mr3-m mr0-l" data-light-group-id="' +
              groupVal +
              '" data-light-id="group_id:' +
              groupVal +
              '" id="' +
              groupSlug +
              '-all"><div class="light flex items-center mb3"><span class="light-select"></span><h4 class="mv0">All</h4></div></div>' +
              '</div></div>';
            lightGroups.innerHTML = lightGroups.innerHTML + groupContainer;
            console.log(groupName);
            // axios
            //   .get('lifx_get.php')
            //   .then((data) =>
            //     data.data.map(function (light) {
            //       lightLabel = light.label;
            //       lightId = light.id;
            //       lightSlug = slugify(lightLabel);
            //       lightOption = document.createElement('option');
            //       lightGroup = light.group.name;
            //       console.log(lightGroup);
            //       if (groupName == lightGroup) {
            //         document.querySelector('#' + groupSlug + ' .group-lights').innerHTML =
            //           '<div class="group-light-container"><div class="group-light" data-light-id="' +
            //           lightId +
            //           '" id="' +
            //           lightSlug +
            //           '"><h4>' +
            //           lightLabel +
            //           '</h4></div></div>';
            //       }
            //     })
            //   )
            //   .then(function () {})
            //   .catch((err) => console.log(err));
            break;
          }
        }
      }
      // selectGroup.innerHTML = '<option value="all">All</option>' + selectGroup.innerHTML;
      var allLights = document.querySelectorAll('.light-container');
      var allGroups = document.querySelectorAll('.group-container');
      allLights.forEach((light) => {
        var lightGroupId = light.getAttribute('data-light-group-id');
        lightId = light.getAttribute('data-light-id');
        allGroups.forEach((group) => {
          var groupId = group.getAttribute('data-group-id');
          var groupSlug = group.getAttribute('id');
          var groupLightsContainer = document.querySelector(
            '#' + group.getAttribute('id') + ' .group-lights'
          );
          if (groupId == lightGroupId) {
            console.log(group);
            groupLightsContainer.prepend(light);
          }
        });
        light.onclick = function () {
          allLights.forEach((light2) => {
            light2.classList.remove('light-selected');
          });
          if (light.classList.contains('light-selected')) {
            light.classList.remove('light-selected');
          } else {
            light.classList.add('light-selected');
            selectedLight = light.getAttribute('data-light-id');
            changeUrl();
          }
        };
      });

      customSelectMenu();
    })
    .catch((err) => console.log(err));
}
buildLightSelect();

function updateLight(e) {
  console.log(e.value);
  // groupTitle.innerText = 'Lights Inside ' + e.innerText;
}

colorPicker.onchange = function () {
  console.log(this.value);
  selectedColor = this.value.replace('#', '');
  changeUrl();
};

var setColor = document.querySelector('#set-color');
setColor.onclick = function () {
  axios
    .get('/lifx_put.php?light=' + selectedLight + '&color=' + selectedColor)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

// function get_lights() {

//   var token = "c57d5da289a19e256dd51ead0869bcce490aa7b45d4b9767fc4c1ebbcfca76a3";

//   var headers = { "Authorization":"Bearer " + token, };

//   //var data = {"color":"blue saturation:0.5" }
//   //var data = {"data":"color=blue"}
//   //var data = {"color":"blue"}
//     // var data = {"power":"off"}

//   var options =
//       { "method" : "get",
//         "headers": headers,
//         "data"   : data,
//         "contentType": "application/json"
//       };

//   var result = UrlFetchApp.fetch('https://api.lifx.com/v1/lights/all/', options).getContentText();

//   Logger.log(result);
//   }

function customSelectMenu() {
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName('custom-select');
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName('select')[0];
    console.log(x[i]);
    console.log(x[i].getElementsByTagName('select'));
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement('DIV');
    a.setAttribute('class', 'select-selected');
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement('DIV');
    b.setAttribute('class', 'select-items select-hide');
    for (j = 0; j < ll; j++) {
      /* For each option in the original select element,
    create a new DIV that will act as an option item: */
      c = document.createElement('DIV');
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener('click', function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName('select')[0];
        sl = s.length;
        h = this.parentNode.previousSibling;

        Array.from(s.children).forEach(function (item) {
          item.removeAttribute('selected');
        });
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName('same-as-selected');
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute('class');
            }
            this.setAttribute('class', 'same-as-selected');
            s.options[i].setAttribute('selected', '');
            // updateLight(s.options[i]);
            console.log(s);
            if (s.id == 'select-group') {
              console.log('is group select');

              console.log(s.options[i]);
              document.querySelectorAll('.group-container').forEach((group) => {
                group.classList.add('dn');
                if (group.getAttribute('data-group-id') == s.options[i].value) {
                  group.classList.remove('dn');
                }
              });
              if (s.options[i].value == 'all') {
                selectedLight = 'all';
                changeUrl();
              }
            }
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener('click', function (e) {
      /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle('select-hide');
      this.classList.toggle('select-arrow-active');
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
  except the current select box: */
    var x,
      y,
      i,
      xl,
      yl,
      arrNo = [];
    x = document.getElementsByClassName('select-items');
    y = document.getElementsByClassName('select-selected');
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove('select-arrow-active');
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add('select-hide');
      }
    }
  }

  /* If the user clicks anywhere outside the select box, then close all select boxes: */
  document.addEventListener('click', closeAllSelect);
}

function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaeeeeiiiioooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}
