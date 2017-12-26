package tools;

import android.content.Context;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;

import java.util.HashMap;
import java.util.Map;

public class postMethod {
    public static postMethodListener mpostMethodListener;
    public void setpostMethodListener(postMethodListener mpostMethodListener){
        this.mpostMethodListener=mpostMethodListener;
    }
    /**
     * 第一个参数：请求方式
     * 第二个参数：请求接口
     * 第三个参数：请求成功回调
     * 第四个参数：请求失败回调
     * 第五个参数：请求参数
     */
    public static void loginPost(final Context context,String postUrl,final String loginNum,final String loginPsd)
    {
        String url = postUrl;
        StringRequest request = new StringRequest(Request.Method.POST,url, new Response.Listener<String>() {

            @Override
            public void onResponse(String response)
            {
                mpostMethodListener.getBackInfo(response);
            }
        }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error)
            {
                Toast.makeText(context, error.toString(),Toast.LENGTH_SHORT).show();
            }
        }){
            @Override
            protected Map<String, String> getParams() throws AuthFailureError
            {
                Map<String,String> map = new HashMap<String, String>();
                map.put("loginNum", loginNum);
                map.put("loginPsd", loginPsd);
                return map;
            }
        };
        VolleySingleton.getVolleySingleton(context).addToRequestQueue(request);
    }
}
