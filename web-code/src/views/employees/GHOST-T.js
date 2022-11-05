export default {
  /**
   * 表单校验规则
   */
  rules: function () {
    return {
      name: [
        {
          required: true,
          message: '请填写name',
          trigger: 'blur'
        }
      ],
      city: [
        {
          required: true,
          message: '请填写city',
          trigger: 'blur'
        }
      ],
      email: [
        {
          required: true,
          message: '请填写email',
          trigger: 'blur'
        }
      ],
      time: [
        {
          required: true,
          message: '请填写time',
          trigger: 'blur'
        }
      ],
      color: [
        {
          required: true,
          message: '请填写color',
          trigger: 'blur'
        }
      ],
      level: [
        {
          required: true,
          message: '请填写level',
          trigger: 'blur'
        }
      ]
    };
  }
};
