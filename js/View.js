export default class View {
  _data

  render(data) {
    this._data = data
    const markup = this.__generateMarkup()

    this._clear()
    this._parentElement.inserAdjacentHTML('afterbegin', markup)
  }

  _clear() {
    this._parentElement.innerHTML = ''
  }

}


