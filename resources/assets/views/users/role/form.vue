<template>
    <div class="row">
        <div class="col-xs-12">
            <div class="box" v-loading="loading">
                <div class="box-header clearfix">
                    <h3 class="box-title">{{ title }}</h3>

                    <div class="btn-group btn-group-sm pull-right margin-r-5">
                        <button
                                type="button"
                                class="btn btn-default"
                                @click.prevent="$router.push({name: 'admin.users.role'})">
                            <i class="fa fa-reply bigger-120"></i>
                            {{ $t('form.back') }}
                        </button>
                    </div>
                </div>
                <!-- /.box-header -->
                <b-form
                        :fields="fields"
                        :info="info"
                        :errors="errors">
                    <el-tree
                            :data="permissionList"
                            show-checkbox
                            node-key="id"
                            ref="tree"
                            default-expand-all
                            :render-content="renderContent"
                            slot="perms">
                    </el-tree>
                </b-form>
                <!-- /.box-body -->
                <div class="box-footer">
                    <el-button type="primary" @click="save" :loading="buttonLoading">{{ $t('form.ok') }}</el-button>
                </div>
                <!-- /.box-footer -->
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,
                info: {},
                errors: {},
                permissionList: [],

                buttonLoading: false,
            }
        },
        computed: {
            title () {
                return this.$route.name == 'admin.users.role.edit'
                    ? this.$t('form.edit_role')
                    : this.$t('form.create_role');
            },
            fields() {
                return [
                    {
                        key: 'name',
                        title: this.$t('table.name'),
                    },
                    {
                        key: 'display_name',
                        title: this.$t('table.display_name'),
                    },
                    {
                        key: 'description',
                        title: this.$t('table.description'),
                        type: 'textarea',
                    },
                    {
                        key: 'perms',
                        title: '授权',
                    }
                ];
            },
        },
        created () {
            this.fetchData();
        },
        methods: {
            fetchData() {
                if (this.$route.name == 'admin.users.role.edit' && this.$route.params.id) {
                    var _this = this;
                    this.fields[0]['disabled'] = true; // 标识名不可编辑

                    this.$http.all([this.getInfo(), this.getPermissionList()])
                        .then(this.$http.spread(function (infoRes, permsRes) {
//                            console.log('perms', permsRes);
//                            console.log(this);
                            _this.permissionList = _this.parsePermissionTree(permsRes.data)
                            _this.info = {
                                id: infoRes.data.id,
                                name: infoRes.data.name,
                                display_name: infoRes.data.display_name,
                                perms: [],
                            }
                            if (infoRes.data.perms.length > 0) {
                                infoRes.data.perms.forEach(perm => {
                                    _this.info.perms.push(perm.id);
                                });
                                let keys = _this.parseCheckedPermission(_this.permissionList);
                                _this.$refs.tree.setCheckedKeys(keys);
                            }
                            _this.loading = false;
                        })).catch(error => {});
                } else {
                    this.getPermissionList().then(response => {
                        this.permissionList = this.parsePermissionTree(response.data);
                        this.loading = false;
                    }).catch(error => {});
                }
            },
            getInfo() {
                return this.$http.get('/admin/users/role/'+ this.$route.params.id);
            },
            // 处理需要设置为选中的节点（移除半选中节点，只保留最深层的）
            parseCheckedPermission(perms) {
                let list = [];
                Object.keys(perms).forEach(index => {
                    if (Object.keys(perms[index].children).length > 0) {
                        list = list.concat(this.parseCheckedPermission(perms[index].children));
                    } else {
                        if (this.info.perms.indexOf(perms[index].id) > -1) {
                            list.push(perms[index].id);
                        }
                    }
                });
                return list;
            },
            getPermissionList() {
                return this.$http.get('/admin/users/role/perms/list');
            },
            parsePermissionTree(perms) {
                let list = [];
                Object.keys(perms).forEach(index => {
                    let children = [];
                    if (Object.keys(perms[index].child).length > 0) {
                        children = this.parsePermissionTree(perms[index].child);
                    }
                    list.push({
                        id: perms[index].id,
                        label: perms[index].id + ': ' + perms[index].display_name + '(' + perms[index].name + ')',
                        description: perms[index].description,
                        children: children,
                    });
                });
                return list;
            },
            save() {
                this.info.perms = this.getCheckedPermission();
                this.buttonLoading = true;
                if (this.$route.name == 'admin.users.role.create') {
                    var url = '/admin/users/role/store';
                } else {
                    var url = '/admin/users/role/update';
                }
                this.$http.post(url, this.info).then(response => {
                    this.buttonLoading = false;
                    this.$message.success('操作成功')
                    this.flushPermission();
                    this.$router.push({name: 'admin.users.role'})
                }).catch(error => {
                    this.buttonLoading = false;
                    if (typeof error.response.data == 'object') {
                        this.errors = error.response.data;
                    }
                })
            },
            // 获取选中的节点（包括半选中节点）
            getCheckedPermission() {
                let keys = this.$refs.tree.getCheckedKeys();
                let nodesDOM = this.$refs.tree.$el.querySelectorAll('.el-tree-node');
                let nodesVue = [].map.call(nodesDOM, node => node.__vue__);
                nodesVue.filter(item => item.node.indeterminate === true).forEach(_vue => {
                    keys.push(_vue.node.data.id);
                });
                return keys;
            },
            flushPermission() {
                this.$store.commit('setPermissions', []);
            },
            renderContent(h, {node, data, store}) {
                if (data.description) {
                    return h('span', [
                        node.label + ' ',
                        h('el-tooltip', {
                            props: {
                                content: data.description,
                                effect: 'dark',
                                placement: 'top'
                            }
                        },
                        [
                            h('i', {
                                class: 'fa fa-question-circle'
                            })
                        ])
                    ])
                } else {
                    return h('span', node.label);
                }
            },
        }

    }
</script>