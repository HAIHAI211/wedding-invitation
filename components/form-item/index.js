// components/form-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'input'
    },
    intype: { // input的type
      type: String,
      value: 'text'
    },
    items: {
      type: Array,
      value: [{
        name: '',
        value: 0,
        checked: false
      }]
    },
    must: Boolean,
    label: String,
    name: String,
    placeholder: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
