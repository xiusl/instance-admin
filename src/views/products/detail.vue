<template>
<div style="padding: 20px 32px;">
    <div style="text-align:left;">
        <h5 style="margin-top:0px;">{{product.name}}</h5>
        <div style="display:flex;flex-direction: column;">
            <div style="display: flex">
                <el-input style="width:200px;" v-model="code" placeholder="版本号"></el-input>
                <el-input style="width:200px;margin-left:32px;" v-model="build" placeholder="Build号"></el-input>
                <el-input style="width:200px;margin-left:32px;" v-model="name" placeholder="Name"></el-input>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:10px;">
            <div style="display:flex">
            <el-upload action="#" :http-request="uploadIpa">
                <el-button type="primary">上传 ipa<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-upload>
            <el-upload style="margin-left:32px;" action="#" :http-request="uploadManifest">
                <el-button type="primary">上传 manifest<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-upload>
            </div>
            <el-button type="primary" @click="submitClick">提交</el-button>
        </div>
    </div>
    </div>

    <el-table :data="versions" style="margin-top:20px;">
        <el-table-column type="index"/>
        <el-table-column prop="name" label="Name"/>
        <el-table-column prop="id"   label="Detail">
            <template slot-scope="scope">
                <router-link :to="{path:'/products/'+product.id + '/versions/'+scope.row.id}">
                    详情
                </router-link>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import ProApi from '@/api/pro'
import { uploadToQingCloud } from '@/utils/upload';
export default {
    name: 'product',
    data() {
        return {
            id: '',
            product: {},
            versions: [],
            ip_url: "",
            manifest_url: "",
            code: '',
            name: '',
            build: ''
        }
    },
    mounted() {
        this.id = this.$route.params.id
        this.loadProduct()
        this.loadVersions()
    },
    methods: {
        loadProduct() {
            var that = this
            ProApi.getProduct(this.id).then(data => {
                this.product = data
            })
        },
        loadVersions() {
            ProApi.getVersions(this.id).then(data =>{
                this.versions = data
            })
        },
        uploadIpa(e) {
           if (this.code == '' || 
                    this.build == '' || 
                    !this.product || 
                    this.product.name == '') {
                this.$message({message:'Code Build Product Null',type:'error'})
                return 
            }
            let file = e.file
            let filename = this._fix_file_name(file.name) 
            let url = '/likebit/' + filename
            let date = new Date()
            let dateStr = date.toUTCString()
            let headers = {
                'Content-Type': file.type == '' ? 'application/octet-stream' : file.type,
                'x-qs-date': dateStr 
            }
            let data = {
                'headers': headers,
                'url': url, 
                'method': 'PUT',
                'zone': 'pek3b'
            }
            ProApi.getToken(data).then(res => {
                let token = res
                uploadToQingCloud(file, token, dateStr, filename, res => {
                    console.log(res.config.url)
                    this.ipa_url = res.config.url
                })
            })
        },
        _fix_file_name(filename) {
            return this.product.name + '/' + 
                this.code + '('+this.build+')/' + filename 
        },
        uploadManifest(e) {
            if (this.code == '' || 
                    this.build == '' || 
                    !this.product || 
                    this.product.name == '') {
                this.$message({message:'Code Build Product Null',type:'error'})
                return 
            }
            let file = e.file
            console.log(file)
            let filename = this._fix_file_name(file.name) 
            let url = '/likebit/' + filename
            let date = new Date()
            let dateStr = date.toUTCString()
            let headers = {
                'Content-Type': file.type == "" ? 'application/octet-stream' : file.type,
                'x-qs-date': dateStr 
            }
            let data = {
                'headers': headers,
                'url': url, 
                'method': 'PUT',
                'zone': 'pek3b'
            }
            ProApi.getToken(data).then(res => {
                let token = res
                uploadToQingCloud(file, token, dateStr, filename, res => {
                    console.log(res.config.url)
                    this.manifest_url = res.config.url
                })
            })

        },
        submitClick() {
            let data = {
                'name': this.name,
                'code': this.code,
                'build': this.build,
                'app_url': this.ipa_url,
                'manifest_url': this.manifest_url
            }
            ProApi.putProductsVersion(this.product.id, data).then(res => {
                console.log(res)
                this.code = ''
                this.build = ''
                this.name = ''
                this.loadVersions()
            })
        }
    }
}
</script>
