<?php

namespace Sco\Admin\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\Rule;

class ManagerRequest extends BaseFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id'       => 'integer',
            'name'     => [
                'bail',
                'required',
                'regex:/^[a-z0-9]+$/i',
                'between:4,20',
                Rule::unique('managers')->ignore($this->input('id')),
            ],
            'email'    => [
                'bail',
                'email',
                'required',
                Rule::unique('managers')->ignore($this->input('id')),
            ],
            'password' => 'bail|required_without:id',
            //'sort'     => 'integer|between:0,255',
        ];
    }

    protected function getMessages()
    {
        return [
            'regex'            => '字母数字',
            'required_without' => '密码不能为空',
            'between'          => trans('admin::validation.between.string'),
            'min'              => trans('admin::validation.min.string'),
        ];
    }

    protected function getAttributes()
    {
        return [
            'name' => '管理员名称',
        ];
    }

    protected function withValidator(Validator $validator)
    {
        $validator->sometimes('password', 'min:6', function () {
            return !empty($this->input('password'));
        });
    }
}
