package com.e_learning;
/*
* 欢迎界面
* */
import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import tools.AnimationButton;
import tools.CustomVideoView;

public class WelcomeActivity extends AppCompatActivity{

    private CustomVideoView videoview;
    private AnimationButton btn_start;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);
        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        initView();
    }

    /**
     * 初始化
     */
    private void initView() {
        //跳转登录界面，绑定button
        btn_start = (AnimationButton) findViewById(R.id.btn_start);
        btn_start.setAnimationButtonListener(new AnimationButton.AnimationButtonListener() {
            @Override
            public void onClickListener() {
                btn_start.start();
            }

            @Override
            public void animationFinish() {
                Intent to_Login=new Intent(WelcomeActivity.this,LoginActivity.class);
                startActivity(to_Login);
                finish();
//                Toast.makeText(WelcomeActivity.this,"动画执行完毕",Toast.LENGTH_SHORT).show();
//                finish();
            }
        });

        videoview = (CustomVideoView) findViewById(R.id.videoview);
        //设置播放加载路径
        videoview.setVideoURI(Uri.parse("android.resource://"+getPackageName()+"/"+R.raw.welcome));
        //播放
        videoview.start();
        //循环播放
        videoview.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mediaPlayer) {
                videoview.start();
            }
        });

    }
}
