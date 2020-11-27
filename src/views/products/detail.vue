<template>
<div style="padding: 20px 32px;">
    <div style="text-align:left;">
        <h5 style="margin-top:0px;">{{product.name}}</h5>
        <div>
        <el-upload action="#" :http-request="uploadIpa">
            <el-button type="primary">上传 ipa<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-upload>
        <el-button type="primary">上传 manifest<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
    </div>

    <el-table :data="versions" style="margin-top:10px;">
        <el-table-column type="index"/>
        <el-table-column prop="name" label="Name"/>
        <el-table-column prop="id"   label="Detail">
            <template slot-scope="scope">
                <router-link :to="{path:'/products/'+scope.row.id}">
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
            versions: []
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
            console.log(e)
            let file = e.file
            let url = '/likebit/' + file.name
            let date = new Date()
            let headers = {
                'Content-Type': file.type,
                'Date': date.toUTCString()
            }
            let data = {
                'headers': headers,
                'url': url, 
                'method': 'PUT',
                'zone': 'pek3b'
            }
            ProApi.getToken(data).then(res => {
                let token = res
                uploadToQingCloud(file, url, token, headers, res => {

                })
            })
        }
    }
}
</script>
