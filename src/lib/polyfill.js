import Url from "./utils/Url";

export default function loadPolyFill() {

  if (!('isConnected' in Node.prototype)) {
    Object.defineProperty(Node.prototype, 'isConnected', {
      get() {
        return (
          !this.ownerDocument ||
          !(
            this.ownerDocument.compareDocumentPosition(this) &
            this.DOCUMENT_POSITION_DISCONNECTED
          )
        );
      },
    });
  }

  if (!HTMLElement.prototype.append) {
    HTMLElement.prototype.append = function (...nodes) {
      nodes.map(node => {
        this.appendChild(node);
      });
    };
  }

  if (!HTMLElement.prototype.remove) {
    HTMLElement.prototype.remove = function () {
      this.parentElement.removeChild(this);
    };
  }

  Object.defineProperty(String.prototype, 'hashCode', {
    value: function () {
      let hash = 0;
      for (let i = 0; i < this.length; i++) {
        const chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return Math.abs(hash) + (hash < 0 ? 'N' : '');
    }
  });

  Object.defineProperty(String.prototype, 'subtract', {
    value: function (str) {
      return this.replace(new RegExp("^" + str), '');
    }
  });

  /**
   * Decode any url recursively until its fully decoded
   * @param {string} url URL string
   * @returns {string}
   */
  window.decodeURL = url => {
    if (/%[0-9a-f]{2}/i.test(url)) {
      const newurl = decodeURIComponent(url);
      if (url === newurl) return url;
      return decodeURL(newurl);
    }
    return url;
  };
}