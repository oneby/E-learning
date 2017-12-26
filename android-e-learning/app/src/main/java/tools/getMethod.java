package tools;

import android.content.Context;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;

public class getMethod {
    public static getMethodListener mgetMethodListener;
    public void setgetMethodListener(getMethodListener mgetMethodListener){
        this.mgetMethodListener=mgetMethodListener;
    }

    /**
     * 第一个参数：请求方式
     * 第二个参数：请求接口
     * 第三个参数：请求成功回调
     * 第四个参数：请求失败回调
     * 第五个参数：请求参数
     */
    public static void loadDataGet(final Context context, String getUrl)
    {
        String url = getUrl;
        StringRequest request = new StringRequest(Request.Method.GET,url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response)
            {
                mgetMethodListener.getBackInfo(response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error)
            {
                Toast.makeText(context, error.toString(),Toast.LENGTH_SHORT).show();
            }
        });
        VolleySingleton.getVolleySingleton(context).addToRequestQueue(request);
    }
}
