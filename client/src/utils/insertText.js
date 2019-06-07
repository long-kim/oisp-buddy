function insert(vm, prefix, hint = "", subfix = "") {
  const value = vm.value;
  console.log(vm);
  if (vm.selectionStart || vm.selectionStart === 0) {
    let start = vm.selectionStart;
    let end = vm.selectionEnd;

    if (start === end) {
      vm.value =
        value.substring(0, start) +
        prefix +
        hint +
        subfix +
        value.substring(end, value.length);
      vm.selectionStart = start + prefix.length;
      vm.selectionEnd = end + prefix.length + hint.length;
    } else {
      vm.value =
        value.substring(0, start) +
        prefix +
        value.substring(start, end) +
        subfix +
        value.substring(end, value.length);
      vm.selectionStart = start + prefix.length;
      vm.selectionEnd = end + prefix.length;
    }

    vm.focus();
  }
}

let shortcuts = {
  bold(vm) {
    insert(vm, "[b]", "text", "[/b]");
  },
  italic(vm) {
    insert(vm, "[i]", "text", "[/i]");
  },
  underline(vm) {
    insert(vm, "[u]", "text", "[/u]");
  },
  strikethrough(vm) {
    insert(vm, "[s]", "text", "[/s]");
  },
  fsize50(vm) {
    insert(vm, "[size=50]", "text", "[/size]");
  },
  fsize85(vm) {
    insert(vm, "[size=85]", "text", "[/size]");
  },
  fsize100(vm) {
    insert(vm, "[size=100]", "text", "[/size]");
  },
  fsize150(vm) {
    insert(vm, "[size=150]", "text", "[/size]");
  },
  url(vm) {
    insert(vm, "[url]", "link", "[/url]");
  },
  ul(vm) {
    insert(vm, "[list]\n[*]", "item", "\n[/list]");
  },
  ol(vm) {
    insert(vm, "[list=1]\n[*]", "item", "\n[/list]");
  },
  paragraph(vm) {
    insert(vm, "[p]\n", "text", "\n[/p]");
  },
  break(vm) {
    insert(vm, "[br]", "", "[/br]");
  },
  image(vm) {
    insert(vm, "[img]", "url", "[/img]");
  },
  code(vm) {
    insert(vm, '[code lang="', "language", '"]\n\n[/code]');
  },
  spoiler(vm) {
    insert(vm, "[spoil]", "text", "[/spoil]");
  },
  quote(vm) {
    insert(vm, "[quote]", "text", "[/quote]");
  }
};

export default (vm, type) => {
  return shortcuts[type](vm);
};
