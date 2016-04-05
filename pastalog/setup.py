from setuptools import setup

setup(name='pastalog',
      version='1.0.1',
      description='Simple, realtime visualization of neural network training performance.',
      url='http://github.com/rewonc/pastalog',
      author='Rewon Child',
      author_email='rewonc@gmail.com',
      license='MIT',
      packages=['pastalog'],
      install_requires=[
          'requests',
      ],
      include_package_data = True,
      scripts=['bin/pastalog'],
      zip_safe=False)