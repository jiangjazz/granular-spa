<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg" alt="996.icu" /></a>

## granular-spa
```
微前端架构的一种实现形式————各个子项目独立打包、独立发布；也可独立启动、运行
支持全局store（暂不支持所有子项目互相暴露store）
```
---
## 项目目录结构
```
├── appMain           (主项目)
├── appHome           (子项目，路由: '' | '/home')
├── appVue            (子项目，路由：'/vue')
├── dist              (build生成出的静态资源目录，方便npm run start查看)
├── package.json      (依赖包)
└── readme.md         (说明文档)
```

----
## 版本记录

### v0.2.0
```
新增内容
- 全局添加一个redux store，可全局访问，子项目注册方式见appHome项目
修改内容
- 修正一个single-spa-vue包引起的bug
```
---
### v0.1.0
```
- 支持独立开发、独立编译打包。最终整合为静态资源启动整体或单个项目
```

---
## 操作命令


```
npm run install-all
- 加载所有子项目依赖

---

npm run serve-all
- 一键启动所有子项目（也可以自行独立启动单个项目）
- main项目端口 9000
- home项目端口 9100
- vue项目端口 9001

---

npm run build-all
- 一键编译打包所有子项目（也可自行独立编译打包单个项目）

---

npm run start
- 启动编译完后的整体项目，端口5000(需全局安装serve包，也可自行按照spa应用的启动方式)
```


---
## 常见问题

```
目前没人问问题
```
