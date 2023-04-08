import {renderPictures} from './picture-modal.js';
import {closeImageModal, setFormSubmit} from './form.js';
import {showAlert,debounce} from './util.js';
import {getData, sendData} from './api.js';
import {showErrorMessage,showSuccessMessage} from './messages-form.js';
import {filteredPictures,init} from './filter.js';

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
  const debounceRenderPictureModal = debounce(renderPictures);
  init(data,debounceRenderPictureModal);
  renderPictures(filteredPictures());
} catch (err) {
  showAlert(err.message);
}
