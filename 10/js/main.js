import {renderPictureModal} from './picture-modal.js';
import './form.js';
import {closeImageModal, setFormSubmit} from './form.js';
import {showAlert} from './util.js';
import {getData, sendData} from './api.js';
import {showErrorMessage,showSuccessMessage} from './messages-form.js';


setFormSubmit (async (data) => {
  try {
    await sendData(data);
    closeImageModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderPictureModal(data);
} catch (err) {
  showAlert(err.message);
}
