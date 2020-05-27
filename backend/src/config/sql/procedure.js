module.exports = ctx => {
  class Procedure {

    selectMessages({ iid, where, orders, page, offset, count }) {

      // for safe
      where = where ? ctx.model._where(where) : null;
      orders = orders ? ctx.model._orders(orders) : null;
      const limit = page ? ctx.model._limit(page.size, page.index) : null;

      //
      const _where = where ? `${where} AND` : ' WHERE';
      const _orders = orders || '';
      const _limit = limit || '';

      // fields
      let _selectFields;
      if (count) {
        _selectFields = 'count(*) as _count';
      } else {
        _selectFields = 'a.*';
      }

      // offset
      let _offsetWhere;
      if (typeof offset === 'number') {
        _offsetWhere = ` and a.id > ${parseInt(offset)}`;
      } else {
        _offsetWhere = '';
      }

      // sql
      const _sql =
        `select ${_selectFields} from aSocketIOMessageView a
          ${_where}
           (
             a.deleted=0 and a.iid=${iid}
             ${_offsetWhere}
           )
          ${count ? '' : _orders}
          ${count ? '' : _limit}
        `;

      // ok
      return _sql;
    }

  }

  return Procedure;

};
