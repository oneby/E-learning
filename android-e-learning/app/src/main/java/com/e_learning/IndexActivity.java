package com.e_learning;

import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.SearchView;
import android.widget.Toast;

public class IndexActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_index);
        initActionBar();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.index, menu);

        //对搜索控件进行操作
        MenuItem searchItem=menu.findItem(R.id.index_research);
        SearchView searchView=(SearchView)searchItem.getActionView();
        // 当SearchView获得焦点时弹出软键盘的类型，就是设置输入类型
        searchView.setInputType(EditorInfo.TYPE_CLASS_TEXT);
        // 设置回车键表示查询操作
        searchView.setImeOptions(EditorInfo.IME_ACTION_SEARCH);
        // 为searchView添加事件
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            // 输入后点击回车改变文本
            @Override
            public boolean onQueryTextSubmit(String query) {

                Toast.makeText(IndexActivity.this,"您输入了"+query+",但是我们并不作处理",Toast.LENGTH_SHORT).show();
                return false;
            }
            // 随着输入改变文本
            @Override
            public boolean onQueryTextChange(String newText) {
                return false;
            }
        });

        return super.onCreateOptionsMenu(menu);
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
        actionBar.setTitle(" E-learning");
        actionBar.setDisplayShowTitleEnabled(true);
    }
}
