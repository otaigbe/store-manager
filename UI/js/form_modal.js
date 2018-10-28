// Get modal element
/*var modal = document.getElementById('simpleModal');
// Get open modal button
var modalBtn = document.getElementById('modalBtn');
// Get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];

// Listen for open click
modalBtn.addEventListener('click', openModal);
// Listen for close click
closeBtn.addEventListener('click', closeModal);
// Listen for outside click
//window.addEventListener('click', outsideClick);

// Function to open modal
function openModal(){
  modal.style.display = 'block';
}

// Function to close modal
function closeModal() {
  const node = document.getElementById('receipt-table');
  if (node) {
    node.parentElement.removeChild(node);
  }
const checkboxes = document.getElementsByClassName("tick")
  //console.log (checkboxes);
  for (let i = 0; i < checkboxes.length; i++){
	  if (checkboxes[i].checked===true){
		  checkboxes[i].checked=false;
		  }
  modal.style.display = 'none';
}
}
// Function to close modal if outside click
/*function outsideClick(e) {
  if(e.target === modal){
    modal.style.display = 'none';
  }
}*/// JavaScript Document */