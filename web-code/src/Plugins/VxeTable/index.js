import XEUtils from 'xe-utils';
import { VXETable, Header, Column, Table } from 'vxe-table';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';

VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
});

export default {
  install: function (vm) {
    vm.use(Header)

      .use(Column)

      .use(Table);
  }
};
