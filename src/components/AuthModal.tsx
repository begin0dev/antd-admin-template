import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { signUpApi } from "../lib/services/auth";
import { errorHandler } from "../lib/services/apiClient";
import useThrottleCallback from "../lib/hooks/useThrottleCallback";

interface PropsInterface {
  visible: boolean;
  onClose: () => void;
}

const AuthModal = ({ visible, onClose }: PropsInterface) => {
  const onFinish = useThrottleCallback(async (params: { username: string; password: string }) => {
    try {
      await signUpApi(params);
      message.success("어드민 계정등록 신청되었습니다. 개발자에게 승인요청해주세요~");
      onClose();
    } catch (err) {
      errorHandler(err);
    }
  });

  return (
    <Form id="signup_form" onFinish={onFinish}>
      <Modal
        title="어드민등록"
        width={380}
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button
            form="signup_form"
            type="primary"
            htmlType="submit"
            size="large"
            key="submit_btn"
            block
          >
            계정생성요청
          </Button>,
        ]}
      >
        <Row gutter={[0, 8]} justify="center">
          <Col span={24}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "아이디를 적어주세요!" }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="아이디"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  validator(rule, value) {
                    if (value.trim().length === 0)
                      return Promise.reject(new Error("비밀번호를 적어주세요!"));
                    if (value.trim().length < 6)
                      return Promise.reject(new Error("비밀번호는 최소 6자 이상해주세요"));
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="비밀번호"
              />
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </Form>
  );
};

export default AuthModal;
