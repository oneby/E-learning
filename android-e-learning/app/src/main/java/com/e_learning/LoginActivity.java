package com.e_learning;

import android.content.Intent;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import tools.Url;
import tools.getMethod;
import tools.postMethod;
import tools.postMethodListener;

public class LoginActivity extends AppCompatActivity implements View.OnClickListener{

    //控件
    private EditText number;
    private EditText password;
    private Button loginBtn;
    private TextView forget;
    private ImageView wechat;
    private ImageView qq;
    private ImageView boke;

    //学号及密码内容
    private String numberPost;
    private String passPost;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        initActionBar();
        initView();
        initListener();
    }

    //设置当前界面的ActionBar
    public void initActionBar(){
        //获取ActionBar
        ActionBar actionBar = getSupportActionBar();
        actionBar.setDisplayShowHomeEnabled(true);
        //设置标题图标
        actionBar.setIcon(R.drawable.logo);
        actionBar.setDisplayUseLogoEnabled(true);
        //设置标题名
        actionBar.setTitle("     登录");
        actionBar.setDisplayShowTitleEnabled(true);
    }

    //初始化控件
    public void initView(){
        number=(EditText)findViewById(R.id.number);
        password=(EditText)findViewById(R.id.password);
        loginBtn=(Button)findViewById(R.id.loginBtn);
        forget=(TextView)findViewById(R.id.forget);
        wechat=(ImageView)findViewById(R.id.wechat);
        qq=(ImageView)findViewById(R.id.qq);
        boke=(ImageView)findViewById(R.id.boke);
    }

    //初始化控件事件
    public void initListener(){
        loginBtn.setOnClickListener(this);
        forget.setOnClickListener(this);
        wechat.setOnClickListener(this);
        qq.setOnClickListener(this);
        boke.setOnClickListener(this);
    }

    //取到当前界面中学号及密码的内容
    public void getInfo(){
        numberPost=number.getText().toString();
        passPost=password.getText().toString();
    }

    @Override
    public void onClick(View view) {
        getInfo();
        switch (view.getId()){
            case R.id.loginBtn:
                //验证用户名及密码的格式，正确则提交到服务器验证，不正确则提示
                if(numberPost.isEmpty()){
                    Toast.makeText(LoginActivity.this,"您未输入学号，请输入后登录",Toast.LENGTH_SHORT).show();
                    number.requestFocus();
                }else if(passPost.isEmpty()){
                    Toast.makeText(LoginActivity.this,"您未输入密码，请输入后登录",Toast.LENGTH_SHORT).show();
                    password.requestFocus();
                }else{
                    postMethod login=new postMethod();
                    login.setpostMethodListener(new postMethodListener() {
                        @Override
                        public void getBackInfo(String back) {
                            try {
                                JSONObject backObject=new JSONObject(back);
                                if(backObject.getBoolean("status")){
                                    Intent intent=new Intent(LoginActivity.this,IndexActivity.class);
                                    startActivity(intent);
                                    finish();
                                }else{
                                    Toast.makeText(LoginActivity.this,backObject.getString("msg"),Toast.LENGTH_SHORT).show();
                                }
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    });
                    login.loginPost(this, Url.login,numberPost,passPost);
                }
                break;
            case R.id.forget:
                break;
            case R.id.wechat:
                break;
            case R.id.qq:
                break;
            case R.id.boke:
                break;
        }
    }
}
