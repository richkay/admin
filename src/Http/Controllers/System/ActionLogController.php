<?php


namespace Sco\Admin\Http\Controllers\System;


use Illuminate\Http\Request;
use Sco\Admin\Http\Controllers\BaseController;

class ActionLogController extends BaseController
{
    public function getList(Request $request)
    {
        $ActionLog = app('ActionLog');
        if ($request->has('user_id')) {
            $ActionLog = $ActionLog->where('user_id', intval($request->input('user_id')));
        }

        if ($request->has('client_ip')) {
            $ActionLog = $ActionLog->where('client_ip', $request->input('client_ip'));
        }

        if ($request->has('type')) {
            $ActionLog = $ActionLog->where('type', $request->input('type'));
        }

        $list = $ActionLog->paginate();

        return response()->json($list);
    }
}
