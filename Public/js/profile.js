// modal
var modal = document.getElementById('mymodal');
var span = document.getElementsByClassName('close');

function refreshPage() {
	window.location.reload();
}

function showModal() {
	modal.style.display = 'block';
}

span.onclick = function () {
	modal.style.display = 'none';
	refreshPage();
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none';
		refreshPage();
	}
};

const newUploadHandler = async (event) => {
	event.preventDefault();
	console.log('you clicked submit');
	const title = document.querySelector('#upload-name').value.trim();
	const description = document.querySelector('#upload-desc').value.trim();
	if (title && description) {
		const form = new FormData();
		form.append('title', title);
		form.append('description', description);
		const options = {
			method: 'POST',
		};

		options.body = form;

		fetch('http://localhost:3001/api/note', options)
			.then((response) => {
				if (response.ok) {
					showModal();
					document.replace('/');
				} else {
					alert('Failed to create post');
				}
			})
			.catch((err) => console.error(err));
	}
};

const delButtonHandler = async (event) => {
	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');

		const response = await fetch(`http://localhost:3001/api/notes/${id}`, {
			method: 'DELETE',
			id: id,
		});

		if (response.ok) {
			showModal();
			document.location.replace('/profile');
		} else {
			alert('Failed to delete note');
		}
	}
};
const newUploadFormElement = document.querySelector('.new-upload-form');
const noteContainer = document.querySelector('note-container');
newUploadFormElement.addEventListener('submit', newUploadHandler);

document.body.addEventListener('click', function (event) {
	console.log('this button did not register correctly');
	if (event.target.className === 'btn btn-sm btn-danger') {
		console.log('you clicked a button');
		delButtonHandler(event);
	}
});
