/**
 * 树形结构数据分类
 */
export function treeInfoSplit(list, id = '') {
  try {
    if (!(list instanceof Array)) return list;
    const result = [];
    for (let k = 0, len = list.length; k < len; k++) {
      if (list[k]['pid'] === id) {
        list[k].child = treeInfoSplit(list, list[k]['id']);
        result.push(list[k]);
      }
    }
    return result;
  } catch (e) {
    console.log(e);
  }
}

/**
 * 表单校验
 */
export function formRules() {
  return {
    manager: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
    icon: [{ required: true, message: '请输入图标类名', trigger: 'blur' }],
    name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }]
  };
}

/**
 * 新增部门
 * form
 */
export function addBumen(form) {
  form = {};
  form.name = '';
  form.biem = '部门';
  form.icon = 'icon-w_danwei-';
  return form;
}
/**
 * 新增角色
 * form
 * command 角色pid
 */
export function addRole(form, command) {
  form = {};
  form.manager = '';
  form.biem = '角色称号';
  form.name = '';
  form.pid = command;
  form.icon = 'icon-yonghu';
  return form;
}
/**
 * 查看某个角色
 */
export function lookRole(form) {
  const obj = {};
  obj.manager = form.manager;
  obj.biem = '角色称号';
  obj.name = form.name;
  obj.icon = form.icon;
  return obj;
}
